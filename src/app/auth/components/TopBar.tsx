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

const useTopBarStyles = makeStyles({
    togglebtn: {
      alignSelf: "flex-end",
      marginRight: "8px",
      marginTop: "8px",
    },
  });

export default function TopBar() {
  const [isDark, setIsDark] = useAtom(isDarkTheme);
  const styles = useTopBarStyles();
  return (
    <Tooltip content={isDark ? "Enable light mode" : "Enable dark mode"} relationship="label">
      <ToggleButton
        className={styles.togglebtn}
        aria-label="Switch dark mode icon"
        checked={isDark}
        icon={isDark ? <LightbulbPerson24Filled /> : <LightbulbPerson24Regular />}
        onClick={() => setIsDark(!isDark)}
      />
    </Tooltip>
  );
}
