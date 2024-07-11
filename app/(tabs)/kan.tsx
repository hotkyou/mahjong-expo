import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed'
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchCalldata } from '@/components/FetchCalldata';
import { FontAwesome6 } from '@expo/vector-icons';

export default function DiscardScreen() {
  const [kanData, setKanData] = useState<any>();

  const fetchData = async () => {
    const data = await fetchCalldata(3);
    //console.log(data);
    setKanData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let message = '';
  if (kanData >= 0.75) {
    message = '鳴きましょう！';
  } else if (kanData >= 0.5) {
    message = 'かなり鳴いても良いかも！';
  } else if (kanData >= 0.25) {
    message = '少し考えましょう！';
  } else {
    message = '鳴かないでください！';
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['#7367F0', '#CE9FFC']}
      start={{ x: 0.1, y: 0.3 }}
      end={{ x: 0.9, y: 0.9 }}
    >
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>カン予測</Text>
        <TouchableOpacity onPress={fetchData}>
          <FontAwesome6 name="hand-paper" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.call}>
          {Math.round(kanData * 100)}%
        </Text>
        {kanData !== null && (
          <Text style={styles.call}>
            {message}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  titlecontainer: {
    flexDirection: 'row',
    backgroundColor: "rgba(0, 0, 0, 0)",
    marginTop: 50,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: '#f0f0f0',
    fontSize: 24,
    fontWeight: 'bold',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 16,
  },
  call: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});
