import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#fe4066',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#1e1e1e',
                    borderTopWidth: 1,
                    borderTopColor: '#686868',
                    height: 90,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 9,
                    fontWeight: '600',
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name='home' size={size - 4} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='settings-outline' size={size - 4} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout