import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main.ts";
import { Caption2Strong, Image } from "@fluentui/react-components";
import AvatarMenu from "./components/AvatarMenu.tsx";
import ToggleDarkMode from "./components/ToggleDarkMode.tsx";
import { makeStyles, Card } from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Home24Regular,
  CalendarSettings24Regular,
  ChartMultiple24Regular,
  Send24Regular,
} from "@fluentui/react-icons";

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
          width: "80px",
          minHeight: "100vh",
          height: "100%",
          backgroundColor: isDark ? "#373737" : "#f0f0f0",
          padding: "8px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          position: "sticky",
          borderRight: isDark ? "1px solid #252525  " : "1px solid #d7dde4",
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
              <SidebarBtns />
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
          <AvatarMenu isDekstop={true} />
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

function SidebarBtns() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        marginTop: "16px",
      }}
    >
      <SideBarBtn path="/">
        <Home24Regular />
        <Caption2Strong>Dashboard</Caption2Strong>
      </SideBarBtn>

      <SideBarBtn path="/manage/">
        <CalendarSettings24Regular />
        <Caption2Strong>Manage</Caption2Strong>
      </SideBarBtn>

      <SideBarBtn path="/reports">
        <ChartMultiple24Regular />
        <Caption2Strong>Reports</Caption2Strong>
      </SideBarBtn>

      <SideBarBtn path="/communication">
        <Send24Regular />
        <Caption2Strong>Communication</Caption2Strong>
      </SideBarBtn>
    </div>
  );
}

const useSidebarBtnStyles = makeStyles({
  btn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "6px",
  },
});

function SideBarBtn({ children, path }: any) {
  const location = useLocation();
  const isActive = location.pathname.includes(path);

  const styles = useSidebarBtnStyles();
  const navigate = useNavigate();
  return (
    <Button
      appearance={isActive ? "primary" : "subtle"}
      size="large"
      className={styles.btn}
      onClick={() => navigate(path)}
    >
      {children}
    </Button>
  );
}
