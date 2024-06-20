import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed'
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { fetchAPIdata } from '@/components/FetchAPIdata';
import { FontAwesome6 } from '@expo/vector-icons';

interface DataItem {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

export default function DiscardScreen() {
  const [topData, setTopData] = useState<DataItem[]>([]);
  const [sortedData, setSortedData] = useState<DataItem[]>([]);

  const fetchData = async () => {
    const data = await fetchAPIdata('chii');
    setTopData(data.topData);
    setSortedData(data.sortedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={['#0396FF', '#ABDCFF']}
      start={{ x: 0.1, y: 0.3 }}
      end={{ x: 0.9, y: 0.9 }}
    >
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>チー予測</Text>
        <TouchableOpacity onPress={fetchData}>
          <FontAwesome6 name="hand-paper" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      <View style={styles.overlay}>
        <PieChart
          data={topData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      <ScrollView style={styles.legendContainer}>
        {sortedData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.name}</Text>
            <Text style={styles.legendValue}>{item.population}%</Text>
          </View>
        ))}
      </ScrollView>
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
  },
  legendContainer: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 10,
  },
  legendLabel: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  legendValue: {
    color: 'white',
    fontSize: 16,
  },
});
