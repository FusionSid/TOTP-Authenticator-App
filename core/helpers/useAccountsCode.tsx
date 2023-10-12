import { authenticator } from "otplib";
import { Accounts } from "../helpers/types";
import { useState, useEffect } from "react";
import { AccountsWithCode } from "../helpers/types";

function useAccountsCode({ accounts }: { accounts: Accounts }): {
    accountsWithCode: AccountsWithCode;
    error: string | null;
} {
    const [accountsWithCode, setAccountsWithCode] = useState<AccountsWithCode>(
        []
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setAccountsWithCode(
            accounts.map((account) => {
                return { ...account, code: 123 };
            })
        );

        const updateOTPInteval = setInterval(() => {
            setAccountsWithCode(
                accounts.map((account) => {
                    return { ...account, code: Math.random() * 10 };
                })
            );
        }, 5000);

        return () => {
            clearInterval(updateOTPInteval);
        };
    }, []);

    return { accountsWithCode, error };
}

export default useAccountsCode;
