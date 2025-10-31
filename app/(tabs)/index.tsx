import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors)

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView style={homeStyles.container}>
        <Header />
        <TodoInput />
        <TouchableOpacity
          onPress={toggleDarkMode}
        >
          <Text>Click</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}