import { FluentProvider } from "@fluentui/react-components";
import { darkTheme, lightTheme } from "../themeConfig.ts";
import AppRoutes from "src/app/routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isDarkTheme } from "./utils/atoms/main.ts";
import { useAtom } from "jotai";
import useRefresh from "src/app/pages/auth/hooks/useRefresh";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

function App() {
  const [isDark, setIsDark] = useAtom(isDarkTheme);
  const { refreshSession } = useRefresh();

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <FluentProvider theme={isDark ? darkTheme : lightTheme}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster
          position="bottom-right"
          containerStyle={{ zIndex: 2000000, maxHeight: "100%" }}
        />
        {/* <DevTools /> */}
      </QueryClientProvider>
    </FluentProvider>
  );
}

export default App;
