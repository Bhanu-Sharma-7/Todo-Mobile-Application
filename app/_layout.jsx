import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {SafeScreen} from "../src/components/SafeScreen"
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"/>
        </Stack>
      </SafeScreen>
      <StatusBar style="dark"/>
    </SafeAreaProvider>
  );
}
