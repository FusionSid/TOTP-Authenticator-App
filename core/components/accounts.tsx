import React from "react";
import { Accounts } from "../helpers/types";
import { AccountWithCode } from "../helpers/types";
import useAccountsCode from "../helpers/useAccountsCode";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

const AccountItem = ({ account }: { account: AccountWithCode }) => {
    return (
        <View>
            <Text>{account.name}</Text>
            <Text>{account.secret}</Text>
            <Text>{account.code}</Text>
        </View>
    );
};

const AccountsList = ({ accounts }: { accounts: Accounts }) => {
    const { accountsWithCode, error } = useAccountsCode({
        accounts,
    });

    return (
        <SafeAreaView>
            <ScrollView>
                {accountsWithCode.map((account: AccountWithCode) => {
                    return <AccountItem key={account.id} account={account} />;
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountsList;
