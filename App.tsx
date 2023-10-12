import { useState, useCallback, useEffect } from "react";
import { Pressable, Text, View, Linking, Alert } from "react-native";
import * as SQLite from "expo-sqlite";
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
                <Text className="text-red-400 text-2xl text-center">
                    Message: {error.message}
                </Text>
                <Text className="text-red-400 text-2xl text-center">
                    Code: {error.code}
                </Text>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View className="flex-1 gap-10 items-center justify-center bg-white">
                <Text>Loading</Text>
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

// Open app
// Check db table exists if not create
// get list of accounts
// display list of accounts on page with top right having create button
// each account has the name, current code and a timer next to it
// when timer reaches zero it will reset setInterval?
// clicking account allows you to edit name or delete
// create custom hook that runs use effect and returns accounts
