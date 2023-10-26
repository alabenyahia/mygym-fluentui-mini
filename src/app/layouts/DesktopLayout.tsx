import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main.ts";
import { Image } from "@fluentui/react-components";
import AvatarMenu from "./components/AvatarMenu.tsx";
import ToggleDarkMode from "./components/ToggleDarkMode.tsx";
import { makeStyles, Card } from "@fluentui/react-components";

const useDesktopLayoutStyles = makeStyles({
  card: {
    width: "100%",
    minHeight: "100vh",
    height: "100%",
  },
});

export default function DesktopLayout({ children }: any) {
  const [isDark, setIsDark] = useAtom(isDarkTheme);

  const styles = useDesktopLayoutStyles();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          width: "60px",
          minHeight: "100vh",
          height: "100%",
          backgroundColor: isDark ? "#373737" : "#f0f0f0",
          padding: "8px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: 42, height: 42 }}>
            <Image src="/icons/mygym-logo.png" fit="cover" />
            <div></div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <ToggleDarkMode />
          <AvatarMenu />
        </div>
      </nav>

      <main style={{ minHeight: "100vh", height: "100%", flex: 1 }}>
        <Card className={styles.card}>
          <div>{children}</div>
        </Card>
      </main>
    </div>
  );
}
