import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="discard"
        options={{
          title: '打牌',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="snowflake" size={25} color={color} />,
          tabBarActiveTintColor: "#28C76F",
        }}
      />
      <Tabs.Screen
        name="chii"
        options={{
          title: 'チー',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="moon" size={25} color={color} />,
          tabBarActiveTintColor: "#0396FF",
        }}
      />
      <Tabs.Screen
        name="pon"
        options={{
          title: 'ポン',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="meteor" size={25} color={color} />,
          tabBarActiveTintColor: "#EA5455",
        }}
      />
      <Tabs.Screen
        name="kan"
        options={{
          title: 'カン',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="cloud" size={25} color={color} />,
          tabBarActiveTintColor: "#7367F0",
        }}
      />
      <Tabs.Screen
        name="reach"
        options={{
          title: 'リーチ',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="rainbow" size={25} color={color} />,
          tabBarActiveTintColor: "#FF9F43",
        }}
      />
    </Tabs>
  );
}
