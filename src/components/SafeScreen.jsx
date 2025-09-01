import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeScreen({ children }) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[ style.container, { paddingTop: insets.top, paddingBottom: insets.bottom} ]}>
            {children}
        </View>
    )
}

const style = {
    container: {
        flex: 1
    }
}