import { FluentProvider } from "@fluentui/react-components";
import { darkTheme, lightTheme } from "../themeConfig.ts";
import AppRoutes from "src/app/routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isDarkTheme } from "./utils/atoms/main.ts";
import { useAtom } from "jotai";

const queryClient = new QueryClient();

function App() {
  const [isDark, setIsDark] = useAtom(isDarkTheme);

  return (
    <FluentProvider theme={isDark ? darkTheme : lightTheme}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </FluentProvider>
  );
}

export default App;
