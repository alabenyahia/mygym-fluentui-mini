import { FluentProvider } from "@fluentui/react-components";
import { darkTheme, lightTheme } from "../themeConfig.ts";
import Register from "./app/auth/Register.tsx";
import Login from "./app/auth/Login.tsx";

function App() {
  const isDarkTheme = false;

  return (
    <FluentProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Login />
    </FluentProvider>
  );
}

export default App;
