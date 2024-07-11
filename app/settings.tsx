import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Text, View } from "@/components/Themed";
import { fetchAPIdata } from "@/components/FetchAPIdata";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MahjongPath } from "@/components/Mahjong";

interface DataItem {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const mahjongPath = MahjongPath();

export default function SettingsScreen() {
  const [topData, setTopData] = useState<DataItem[]>([]);
  const [sortedData, setSortedData] = useState<DataItem[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    const data = await fetchAPIdata();
    setTopData(data.topData);
    setSortedData(data.sortedData);
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const startFetching = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(fetchData, 2000);
      setIntervalId(id);
    }
  };
  
  return (
    <LinearGradient
      style={styles.container}
      colors={["#28C76F", "#81FBB8"]}
      start={{ x: 0.1, y: 0.3 }}
      end={{ x: 0.9, y: 0.9 }}
    >
      <Text>Settings</Text>

      <Image
        style={styles.image}
        source={ mahjongPath.m2 }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    
  },
  image: {
    width: '5%',
    height: '15%',
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
});
