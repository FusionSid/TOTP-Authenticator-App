import * as SQLite from "expo-sqlite";
import { Text, View } from "react-native";

import useAccounts from "./core/db/useAccounts";
import AccountsList from "./core/components/accounts";

export default function App() {
    const databaseConnection = SQLite.openDatabase("data.db");

    const { isLoading, accounts, error } = useAccounts({
        databaseConnection: databaseConnection,
    });

    if (error !== null) {
        return (
            <View className="flex-1 gap-10 items-center justify-center bg-white">
                <Text className="text-red-400 text-2xl text-center">
                    An Error Occured
                </Text>
                <Text className="text-red-400 text-xl text-center">
                    Message: {error.message}
                </Text>
                <Text className="text-red-400 text-xl text-center">
                    Code: {error.code}
                </Text>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View className="flex-1 gap-10 items-center justify-center bg-white">
                <Text className="text-black font-bold text-2xl text-center">
                    Loading...
                </Text>
            </View>
        );
    }

    return (
        <View className="bg-white">
            <View className="flex items-center justify-between">
                <Text>All Accounts</Text>
                {/* Button to create new */}
            </View>
            <AccountsList accounts={accounts} />
        </View>
    );
}
