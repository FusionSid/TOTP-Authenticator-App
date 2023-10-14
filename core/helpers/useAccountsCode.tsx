import totp from "totp-generator";
import { useState, useEffect } from "react";

import useClock from "./useClock";
import { Accounts, AccountsWithCode } from "../helpers/types";

function useAccountsCode({ accounts }: { accounts: Accounts }): {
    accountsWithCode: AccountsWithCode;
} {
    const [accountsWithCode, setAccountsWithCode] = useState<AccountsWithCode>(
        []
    );
    const timeLeft = useClock();

    useEffect(() => {
        if (timeLeft === 30) {
            setAccountsWithCode(
                accounts.map((account) => {
                    return {
                        ...account,
                        code: totp(account.secret),
                    };
                })
            );
        }
    }, [timeLeft]);

    useEffect(() => {
        setAccountsWithCode(
            accounts.map((account) => {
                return {
                    ...account,
                    code: totp(account.secret),
                };
            })
        );
    }, [accounts]);

    return { accountsWithCode };
}

export default useAccountsCode;
