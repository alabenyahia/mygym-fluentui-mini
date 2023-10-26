import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
} from "@fluentui/react-components/unstable";
import {
  Button,
  Card,
  Divider,
  Image,
  Title3,
  makeStyles,
} from "@fluentui/react-components";
import {
  Dismiss24Regular,
  Navigation24Regular,
  Home24Regular,
  ChartMultiple24Regular,
  Send24Regular,
  PeopleTeam24Regular,
  Class24Regular,
  SportBasketball24Regular,
  PersonSquare24Regular,
  People24Regular,
} from "@fluentui/react-icons";
import { useState } from "react";
import pb from "src/utils/db/pocketbase";
import AvatarMenu from "src/app/layouts/components/AvatarMenu";
import ToggleDarkMode from "./components/ToggleDarkMode";
import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main.ts";
import { useNavigate } from "react-router-dom";

const useMobileLayoutStyles = makeStyles({
  card: {
    minHeight: "calc(100vh - 48px)",
  },
});

export default function MobileLayout({ children }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useAtom(isDarkTheme);

  const styles = useMobileLayoutStyles();
  return (
    <div>
      <header
        style={{
          backgroundColor: isDark ? "#373737" : "#f0f0f0",
          height: "48px",
          width: "100%",
          padding: "8px",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => setIsDrawerOpen((recentVal) => !recentVal)}
            appearance="subtle"
            icon={<Navigation24Regular />}
          />

          <div style={{ width: 32, height: 32 }}>
            <Image src="/icons/mygym-logo.png" fit="cover" />
          </div>

          <div>
            <ToggleDarkMode />
            <AvatarMenu />
          </div>
        </nav>
      </header>
      <main style={{ minHeight: "calc(100vh - 48px)" }}>
        <Card className={styles.card}>
          <div>{children}</div>
        </Card>
      </main>
      <MobileDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
}

type DrawerType = Required<DrawerProps>["type"];

function MobileDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: any;
}) {
  const [type, setType] = useState<DrawerType>("overlay");

  return (
    <Drawer
      type={type}
      separator
      open={isDrawerOpen}
      onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => setIsDrawerOpen(false)}
            />
          }
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: 32, height: 32 }}>
              <Image src="/icons/mygym-logo.png" fit="cover" />
            </div>
            {pb.authStore.model && (
              <Title3>{pb.authStore.model.gymName}</Title3>
            )}
          </div>
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <DrawerContent />
      </DrawerBody>
    </Drawer>
  );
}

const useDrawerContentStyles = makeStyles({
  btns: {
    justifyContent: "flex-start",
    paddingLeft: 0,
  },
});

const manageData = [
  { name: "Members", icon: <People24Regular />, path: "/manage/members" },
  {
    name: "Memberships",
    icon: <PersonSquare24Regular />,
    path: "/manage/memberships",
  },
  {
    name: "Programs",
    icon: <SportBasketball24Regular />,
    path: "/manage/programs",
  },
  { name: "Classes", icon: <Class24Regular />, path: "/manage/classes" },
  { name: "Staff", icon: <PeopleTeam24Regular />, path: "/manage/staff" },
];

function DrawerContent() {
  const styles = useDrawerContentStyles();
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Button
        appearance="subtle"
        icon={<Home24Regular />}
        className={styles.btns}
        onClick={() => navigate("/")}
      >
        Dashboard
      </Button>
      <Button
        appearance="subtle"
        icon={<ChartMultiple24Regular />}
        className={styles.btns}
        onClick={() => navigate("/reports")}
      >
        Reports
      </Button>
      <Button
        appearance="subtle"
        icon={<Send24Regular />}
        className={styles.btns}
        onClick={() => navigate("/communication")}
      >
        Communication
      </Button>
      <Divider />

      <DrawerHeaderTitle>Manage</DrawerHeaderTitle>
      <div
        style={{ marginLeft: "12px", display: "flex", flexDirection: "column" }}
      >
        {manageData.map((item) => {
          return (
            <Button
              appearance="subtle"
              icon={item.icon}
              className={styles.btns}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
