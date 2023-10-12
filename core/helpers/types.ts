export type Account = {
    id: number;
    name: string;
    secret: string;
};

export type Accounts = Account[];

export type AccountWithCode = Account & { code: number };

export type AccountsWithCode = AccountWithCode[];
