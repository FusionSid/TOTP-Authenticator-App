import { useState } from "react";
import * as SQLite from "expo-sqlite";
import { Text, View, Pressable } from "react-native";

import { Accounts } from "./core/helpers/types";
import useAccounts from "./core/db/useAccounts";
import AccountsList from "./core/components/accounts";

export default function App() {
    const databaseConnection = SQLite.openDatabase("data.db");

    const { isLoading, accounts, error } = useAccounts({
        databaseConnection: databaseConnection,
    });

    const [optimisticAccounts, setOptimisticAccounts] = useState<Accounts>([]);

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
            <View className="flex items-center m-10 justify-between">
                <Text className="text-2xl">All Accounts</Text>
                <Pressable
                    onPress={() => {
                        setOptimisticAccounts((o) => [
                            ...o,
                            {
                                id: Math.random() * 100,
                                name: "test",
                                secret: "secret",
                            },
                        ]);
                    }}
                >
                    <Text className="bg-blue-500 text-white font-bold py-4 px-5">
                        add
                    </Text>
                </Pressable>
            </View>
            <AccountsList accounts={accounts.concat(optimisticAccounts)} />
        </View>
    );
}
