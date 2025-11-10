import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/setting.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Preferences = () => {
    const [isAutoSync, setAutoSync] = useState(true);
    const [isNotificationEnable, setNotificationEnable] = useState(true);

    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const settingStyles = createSettingsStyles(colors)
    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
            <Text style={settingStyles.sectionTitle}>Preferences</Text>

            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.primary} style={settingStyles.settingIcon}>
                        <Ionicons name='moon' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingStyles.settingText}>Dark Mode</Text>
                </View>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor="#fff"
                    trackColor={{ false: colors.border, true: colors.primary }}
                    ios_backgroundColor={colors.border}
                />
            </View>

            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.warning} style={settingStyles.settingIcon}>
                        <Ionicons name='notifications' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingStyles.settingText}>Notifications</Text>
                </View>
                <Switch
                    value={isNotificationEnable}
                    onValueChange={() => setNotificationEnable(!isNotificationEnable)}
                    thumbColor="#fff"
                    trackColor={{ false: colors.border, true: colors.warning }}
                    ios_backgroundColor={colors.border}
                />
            </View>

            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.success} style={settingStyles.settingIcon}>
                        <Ionicons name='sync' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingStyles.settingText}>Auto-Sync</Text>
                </View>
                <Switch
                    value={isAutoSync}
                    onValueChange={() => setAutoSync(!isAutoSync)}
                    thumbColor="#fff"
                    trackColor={{ false: colors.border, true: colors.success }}
                    ios_backgroundColor={colors.border}
                />
            </View>
        </LinearGradient>
    )
}

export default Preferences