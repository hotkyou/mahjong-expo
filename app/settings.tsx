import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View, Text } from "@/components/Themed";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MahjongPath } from "@/components/Mahjong";
import { fetchCalldata } from '@/components/FetchCalldata';
import * as ScreenOrientation from 'expo-screen-orientation';
import Svg, { Rect, Text as SText } from 'react-native-svg';

const mahjongPath: Record<string, any> = MahjongPath();
const mahjongTiles = Object.keys(mahjongPath);

export default function SettingsScreen() {
  const [discard, setDiscard] = useState<any>([]);  // 捨て牌
  const [ponData, setPonData] = useState<any>([]);  // ポン
  const [chiData, setChiData] = useState<any>([]);  // チー
  const [kanData, setKanData] = useState<any>([]);  // カン
  const [tehaiData, setTehaiData] = useState<any>([]);  // 手牌
  const [reachData, setReachData] = useState<any>([]);  // リーチ

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  };

  const fetchData = async () => {
    const discardData = await fetchCalldata(0);
    const pon = await fetchCalldata(1);
    const chi = await fetchCalldata(2);
    const kan = await fetchCalldata(3);
    const reach = await fetchCalldata(4);
    const tehaiData = await fetchCalldata(5);
    
    setDiscard(discardData);
    setPonData(pon);
    setChiData(chi);
    setKanData(kan);
    setReachData(reach);
    setTehaiData(tehaiData);

    //console.log(reach);
  };

  useEffect(() => {
    fetchData();
    lockOrientation();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    // 画面がアンマウントされたときに元のオリエンテーションに戻し、インターバルをクリアする
    return () => {
      ScreenOrientation.unlockAsync();
      clearInterval(interval);
    };
  }, []);

  const dataObject: Record<string, number> = discard.reduce((obj: Record<string, number>, item: any) => {
    obj[item.name] = item.population;
    return obj;
  }, {});

  const maxPopulation = Math.max(...discard.map((item: any) => item.population));

  const maxReach = Math.max(...reachData);
  //console.log(maxReach);
  const maxIndex = reachData.indexOf(maxReach);

  const maxChii = Math.max(...chiData);
  const maxIndexChii = chiData.indexOf(maxChii);

  return (
    <LinearGradient
      style={styles.container}
      colors={["#124534", "#124534"]}
      start={{ x: 0.1, y: 0.3 }}
      end={{ x: 0.9, y: 0.9 }}
    >
      <View style={styles.row}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>ポン：</Text>
          <Text style={styles.overlayText}>
            {(ponData * 100).toFixed(0)}%
          </Text>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>チー：</Text>
          <Image style={styles.imageCall} source={mahjongPath[mahjongTiles[maxIndexChii]]} />
          <Image style={styles.imageCall} source={mahjongPath[mahjongTiles[maxIndexChii + 1]]} />
          <Image style={styles.imageCall} source={mahjongPath[mahjongTiles[maxIndexChii + 2]]} />
        </View>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>カン：</Text>
          <Text style={styles.overlayText}>
            {(kanData * 100).toFixed(0)}%
          </Text>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>リーチ：</Text>
          <Image style={styles.imageCall} source={mahjongPath[mahjongTiles[maxIndex]]} />
        </View>
      </View>
      <View style={styles.overlay2}>
        {tehaiData.map((tile: string, index: number) => (
          <View key={index} style={styles.imageContainer}>
            {dataObject[tile] !== undefined && (
              <Svg height="100" width="45" style={styles.graph}>
                <Rect
                  x="10"
                  y={100 - (dataObject[tile] * 100 / maxPopulation)}
                  width="25"
                  height={dataObject[tile] * 100 / maxPopulation}
                  fill="blue"
                />
                <SText
                  x="13"
                  y={100 - (dataObject[tile] * 100 / maxPopulation) + 15}
                  fill="white"
                  fontSize="15"
                >
                  {(dataObject[tile]).toFixed(0)}
                </SText>
              </Svg>
            )}
            <Image
              style={[
                styles.image,
                index === tehaiData.length - 1 && styles.lastImage
              ]}
              source={mahjongPath[tile as keyof typeof mahjongPath]}
            />
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  overlay2: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
  },
  imageContainer: {
    alignItems: 'center',
    margin: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  graph: {
    top: 0,
  },
  imageCall: {
    width: 30,
    height: 40,
    borderRadius: 4,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    margin: 1
  },
  image: {
    width: 45,
    height: 60,
    borderRadius: 4,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    margin: 1
  },
  lastImage: {
    marginLeft: 10,
  },
});
