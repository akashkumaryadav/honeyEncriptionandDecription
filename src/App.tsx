import { ThemeProvider } from "./components/theme-provider";
import Encryption from "./pages/Encryption";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Encryption />
    </ThemeProvider>
  );
};

export default App;
