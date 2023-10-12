import React from "react";
import { Account, Accounts } from "../helpers/types";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

const AccountItem = ({ account }: { account: Account }) => {
    return (
        <View>
            <Text>{account.name}</Text>
            <Text>{account.secret}</Text>
        </View>
    );
};

const AccountsList = ({ accounts }: { accounts: Accounts }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                {accounts.map((account: Account) => {
                    return <AccountItem key={account.id} account={account} />;
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountsList;
