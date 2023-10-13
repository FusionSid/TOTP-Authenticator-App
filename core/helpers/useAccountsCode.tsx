import totp from "totp-generator";
import { useState, useEffect } from "react";

import { Accounts } from "../helpers/types";
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
                return {
                    ...account,
                    code: totp(account.secret),
                };
            })
        );

        const loopUpdateCode = () => {
            setAccountsWithCode(
                accounts.map((account) => {
                    return {
                        ...account,
                        code: totp(account.secret),
                    };
                })
            );
        };

        // run function once
        loopUpdateCode();

        // calculate how long current code is valid
        const msTillNextCode =
            (30 - (Math.round(Number(new Date()) / 1000) % 30)) * 1000;

        let updateOTPInteval: NodeJS.Timeout;

        // after current code is invalid create a loop that updates every 30 sec
        setTimeout(() => {
            updateOTPInteval = setInterval(loopUpdateCode, 30_000);
        }, msTillNextCode);

        return () => {
            clearInterval(updateOTPInteval);
        };
    }, []);

    return { accountsWithCode, error };
}

export default useAccountsCode;
