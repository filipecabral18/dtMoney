import { createContext, ReactNode, useEffect, useState } from 'react'

interface ITransactions {
    category: string;
    createdAt: string;
    description: string;
    id: number;
    price: number;
    type: 'income' | 'outcome';
}

interface TransactionsContextType {
    transactions: ITransactions[];
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<ITransactions[]>([])
    useEffect(() => {
        async function LoadTransaction() {
            const response = await fetch('http://localhost:3000/transactions')
            const data = await response.json();
            setTransactions(data)
        }
        LoadTransaction()
    }, [])


    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}