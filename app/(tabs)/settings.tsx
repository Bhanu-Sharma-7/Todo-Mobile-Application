import { View, Text, ScrollView } from 'react-native'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/setting.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressStatus from '@/components/ProgressStatus';
import Preferences from '@/components/Preferences';
import DangerZone from '@/components/DangerZone';

const SettingsScreen = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const settingStyles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
      <SafeAreaView style={settingStyles.safeArea}>
        <View style={settingStyles.header}>
          <View style={settingStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
              <Ionicons name='options' size={28} color="#fff"/>
            </LinearGradient>
            <Text style={settingStyles.title}>Settings</Text>
          </View>
        </View>
        <ScrollView
          style={settingStyles.scrollView}
          contentContainerStyle={settingStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStatus />
          <Preferences />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingsScreen;