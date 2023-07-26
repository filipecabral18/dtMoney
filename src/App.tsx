import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/dafault";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/transaction";
import { TransactionsProvider } from "./context/transactionsContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}


