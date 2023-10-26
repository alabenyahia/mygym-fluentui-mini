import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main";
import {
    LightbulbPerson24Filled,
    LightbulbPerson24Regular,
  } from "@fluentui/react-icons";
  import {
    makeStyles,
    Tooltip,
    ToggleButton,
  } from "@fluentui/react-components";



export default function ToggleDarkMode() {
  const [isDark, setIsDark] = useAtom(isDarkTheme);
  return (
    <Tooltip content={isDark ? "Enable light mode" : "Enable dark mode"} relationship="label">
      <ToggleButton
        aria-label="Switch dark mode icon"
        checked={isDark}
        icon={isDark ? <LightbulbPerson24Filled /> : <LightbulbPerson24Regular />}
        onClick={() => setIsDark(!isDark)}
      />
    </Tooltip>
  );
}
