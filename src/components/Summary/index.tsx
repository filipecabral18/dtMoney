
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react"
import { SummaryCard, SummaryContainer } from "./styles"
import { useContext } from "react"
import { TransactionsContext } from "../../context/transactionsContext"
import { priceFormatter } from "../../utils/formater"

export const Summary = () => {
    const { transactions } = useContext(TransactionsContext)


    const summary = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income') {
                acc.income += transaction.price
            }
            if (transaction.type === 'outcome') {
                acc.outcome += transaction.price
            }
            acc.total = acc.income - acc.outcome
            return acc
        },
        {
            income: 0,
            outcome: 0,
            total: 0,
        }
    )


    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>
                <strong>{priceFormatter.format(summary.income)}</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    < ArrowCircleDown size={32} color="#f75a68" />
                </header>
                <strong>{priceFormatter.format(summary.outcome)}</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </header>
                <strong>{priceFormatter.format(summary.total)} </strong>
            </SummaryCard>
        </SummaryContainer>
    )
}