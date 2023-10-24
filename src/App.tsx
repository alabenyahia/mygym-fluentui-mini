import { FluentProvider } from "@fluentui/react-components";
import { darkTheme, lightTheme } from "../themeConfig.ts";
import AppRoutes from "../app-routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const isDarkTheme = false;

  return (
    <FluentProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </FluentProvider>
  );
}

export default App;
