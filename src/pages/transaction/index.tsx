import { useContext } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../context/transactionsContext";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formater";

export function Transactions() {
    const { transactions } = useContext(TransactionsContext)
    return (
        <div>
            <Header />
            <Summary />
            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    {
                        transactions.map((item) =>
                            <tbody key={item.id}>
                                <tr>
                                    <td width="50%">{item.description}</td>
                                    <td>
                                        <PriceHighlight variant={item.type}>
                                            {priceFormatter.format(item.price)}
                                        </PriceHighlight>
                                    </td>
                                    <td>{item.category}</td>
                                    <td>{dateFormatter.format(new Date(item.createdAt))}</td>
                                </tr>
                            </tbody>
                        )
                    }
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    );
}