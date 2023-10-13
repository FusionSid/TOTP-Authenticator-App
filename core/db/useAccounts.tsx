import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";

import { Accounts } from "../helpers/types";

const CREATE_TABLE_QUERY =
    "CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, secret TEXT)";
const GET_ACCOUNTS_QUERY = "SELECT * FROM accounts";

function useAccounts({
    databaseConnection,
}: {
    databaseConnection: SQLite.SQLiteDatabase;
}): {
    isLoading: boolean;
    accounts: Accounts;
    error: SQLite.SQLError | null;
} {
    const [isLoading, setIsLoading] = useState(true);
    const [accounts, setAccounts] = useState<Accounts>([]);
    const [error, setError] = useState<SQLite.SQLError | null>(null);

    useEffect(() => {
        databaseConnection.transaction((tx) => {
            tx.executeSql(CREATE_TABLE_QUERY);
        });
        databaseConnection.transaction((tx) => {
            tx.executeSql(
                GET_ACCOUNTS_QUERY,
                undefined,
                (_, resultSet) => {
                    setAccounts(resultSet.rows._array);
                    setIsLoading(false);
                },
                (_, error) => {
                    setError(error);
                    return false;
                }
            );
        });
    }, [databaseConnection]);

    return { isLoading, accounts, error };
}

export default useAccounts;
