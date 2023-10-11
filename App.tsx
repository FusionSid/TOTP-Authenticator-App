import { useState, useCallback, useEffect } from "react";
import { Pressable, Text, View, Linking, Alert } from "react-native";

export default function App() {
    const handlePress = useCallback(async () => {
        const url = "https://youtube.com/watch?v=dQw4w9WgXcQ";
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count === 69) {
            handlePress();
        }
    }, [count]);

    return (
        <View className="flex-1 gap-10 items-center justify-center bg-white">
            <View>
                <Text className="text-red-400 text-2xl text-center">
                    Hello World!
                </Text>
                <Text className="text-blue-400 text-xl text-center">
                    Current Count: {count}
                </Text>
            </View>
            <View>
                <Pressable onPress={() => setCount((count) => count + 1)}>
                    <Text className="bg-blue-500 text-white font-bold py-4 px-5">
                        Current Count: {count}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
