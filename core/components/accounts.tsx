import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

import useClock from "../helpers/useClock";
import { Accounts } from "../helpers/types";
import { AccountWithCode } from "../helpers/types";
import useAccountsCode from "../helpers/useAccountsCode";

const AccountItem = ({
    account,
    timeLeft,
}: {
    account: AccountWithCode;
    timeLeft: number;
}) => {
    return (
        <View className="flex-row justify-between w-full p-5 bg-blue-500">
            <Text className="text-white text-xl">{account.name}</Text>
            <Text className="text-white text-xl">{account.code}</Text>
            <Text className="text-white text-xl">{timeLeft}</Text>
        </View>
    );
};

const AccountsList = ({ accounts }: { accounts: Accounts }) => {
    const { accountsWithCode } = useAccountsCode({
        accounts,
    });
    const timeLeft = useClock();

    return (
        <SafeAreaView>
            <ScrollView>
                {accountsWithCode.map((account: AccountWithCode) => {
                    return (
                        <AccountItem
                            key={account.id}
                            account={account}
                            timeLeft={timeLeft}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountsList;
