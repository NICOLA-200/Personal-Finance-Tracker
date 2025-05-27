import { Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#2563eb', // Keep active icon/text color as blue
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20, // Round top-left corner
                    borderTopRightRadius: 20, // Round top-right corner
                    padding: 8,
                    height: 60,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View
                            className={`p-2 rounded-full ${focused ? 'text-gray-600' : 'bg-transparent'}`}
                        >
                            <AntDesign name="home" size={size} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="create-expense"
                options={{
                    title: 'Add Expense',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View
                            className={`p-2 rounded-full ${focused ? 'text-gray-600' : 'bg-transparent'}`}
                        >
                            <AntDesign name="pluscircle" size={size} color={color} />
                        </View>
                    ),
                    href: '/create-expense',
                }}
            />
        </Tabs>
    );
}