import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from '@/components/Themed'
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const data = [
  { name: 'Photoshop', population: 15, color: '#FF6384', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Illustrator', population: 25, color: '#36A2EB', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Dreamweaver', population: 20, color: '#FFCE56', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Sketch App', population: 12, color: '#4BC0C0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Adobe XD', population: 18, color: '#9966FF', legendFontColor: '#7F7F7F', legendFontSize: 15 },
];

const chartConfig = {
  backgroundGradientFrom: '#2c1c59',
  backgroundGradientTo: '#2c1c59',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

export default function PieChartScreen() {
  return (
    <LinearGradient style={styles.container} colors={['#7367F0', '#CE9FFC']} start={{x: 0.1, y: 0.3}} end={{x: 0.9, y: 0.9}}>
      <Text style={styles.title}>カン予測</Text>
      <View style={styles.overlay}>
        <PieChart
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.name}</Text>
            <Text style={styles.legendValue}>{item.population}%</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
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
