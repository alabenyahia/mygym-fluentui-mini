import { FluentProvider } from "@fluentui/react-components";
import { darkTheme, lightTheme } from "../themeConfig.ts";
import AppRoutes from "../app-routes.tsx";

function App() {
  const isDarkTheme = false;

  return (
    <FluentProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <AppRoutes />
    </FluentProvider>
  );
}

export default App;
