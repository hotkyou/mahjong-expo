import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const mahjong = [
  { name: '打牌', icon: "snowflake", color: '#d4a5a5', rotate: "(tabs)/discard" },
  { name: 'チー', icon: "moon", color: '#4d7bca', rotate: "(tabs)/chii" },
  { name: 'ポン', icon: "meteor", color: '#98b0d4', rotate: "(tabs)/pon" },
  { name: 'カン', icon: "cloud", color: '#d4b5d4', rotate: "(tabs)/kan" },
  { name: 'リーチ', icon: "rainbow", color: '#d4c3a5', rotate: "(tabs)/reach" },
  { name: 'ALL', icon: "gear", color: '#d48787', rotate: "settings" },
];

export default function DiscardScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>麻雀AIシステムv0.01</Text>
      </View>
      <View style={styles.grid}>
        {mahjong.map((mahjong, index) => (
          <TouchableOpacity onPress={() => router.replace(mahjong.rotate)} key={index} style={[styles.button, { backgroundColor: mahjong.color }]}>
            <FontAwesome6 name={mahjong.icon} size={40} color="white" />
            <Text style={styles.buttonText}>{mahjong.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#228b22',
    paddingTop: 50,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    marginTop: 8,
    fontSize: 18,
  },
});
