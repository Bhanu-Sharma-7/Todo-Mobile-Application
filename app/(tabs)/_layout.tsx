import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import useTheme from '@/hooks/useTheme';

const TabsLayout = () => {
    const { colors } = useTheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
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
                    title: "Setting",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='settings-outline' size={size - 4} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout