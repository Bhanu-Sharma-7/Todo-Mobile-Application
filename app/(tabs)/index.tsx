import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text style={styles.text}>Welcome to my application</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white"
  }
})