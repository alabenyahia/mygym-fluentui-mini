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
      <aside
        style={{
          width: "72px",
          minHeight: "100vh",
          height: "100%",
          backgroundColor: isDark ? "#373737" : "#f0f0f0",
          padding: "8px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          position: "sticky",
          borderRight: isDark ? "1px solid #252525  " : "1px solid #d7dde4"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: 56, height: 56 }}>
            <Image src="/icons/mygym-logo.png" fit="cover" />
            <div>
                <h1>FINISH DIS</h1>
            </div>
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
          <AvatarMenu isDekstop={true}/>
        </div>
      </aside>

      <main style={{ minHeight: "100vh", height: "100%", flex: 1 }}>
        <Card className={styles.card}>
          <div>{children}</div>
        </Card>
      </main>
    </div>
  );
}
