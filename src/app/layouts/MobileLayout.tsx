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
  PeopleTeam24Regular,
  Class24Regular,
  SportBasketball24Regular,
  PersonSquare24Regular,
  People24Regular,
  DriveTrain24Filled,
  ReceiptMoney24Regular,
  BarcodeScanner24Regular,
} from "@fluentui/react-icons";
import { useState } from "react";
import AvatarMenu from "src/app/layouts/components/AvatarMenu";
import ToggleDarkMode from "./components/ToggleDarkMode";
import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main.ts";
import { useNavigate, useLocation } from "react-router-dom";
import useLogin from "src/app/pages/auth/hooks/useLogin";
export default function MobileLayout({ children }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDark, _] = useAtom(isDarkTheme);




  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <header
        style={{
          backgroundColor: isDark ? "#373737" : "#f0f0f0",
          height: "48px",
          width: "100%",
          padding: "8px",
          position: "sticky",
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

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ToggleDarkMode />
            <AvatarMenu />
          </div>
        </nav>
      </header>
      <Card style={{ flex: 1, height: "100%" }}>
        <div style={{ height: "100%" }}>{children}</div>
      </Card>
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
  const [type, _] = useState<DrawerType>("overlay");
  const { getUserQuery } = useLogin();
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
            {getUserQuery.data && <Title3>{getUserQuery.data.gymName}</Title3>}
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
    paddingLeft: "8px",
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
  {
    name: "Gym staff",
    icon: <PeopleTeam24Regular />,
    path: "/manage/gymstaff",
  },
  { name: "Coaches", icon: <DriveTrain24Filled />, path: "/manage/coaches" },
  {
    name: "Discount codes",
    icon: <BarcodeScanner24Regular />,
    path: "/manage/discountcodes",
  },
  {
    name: "Transactions",
    icon: <ReceiptMoney24Regular />,
    path: "/manage/transactions",
  },
];

function DrawerContent() {
  const styles = useDrawerContentStyles();
  const navigate = useNavigate();
  const location = useLocation();
  function isAction(path: string) {
    return location.pathname === path;
  }
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
        appearance={isAction("/") ? "primary" : "subtle"}
        icon={<Home24Regular />}
        className={styles.btns}
        onClick={() => navigate("/")}
      >
        Dashboard
      </Button>
      <Button
        appearance={isAction("/reports") ? "primary" : "subtle"}
        icon={<ChartMultiple24Regular />}
        className={styles.btns}
        onClick={() => navigate("/reports")}
      >
        Reports
      </Button>

      {/* <Button
        appearance={isAction("/calendar") ? "primary" : "subtle"}
        icon={<Calendar24Regular />}
        className={styles.btns}
        onClick={() => navigate("/calendar")}
      >
        Calendar
      </Button> */}

      {/* <Button
        appearance={isAction("/communication") ? "primary" : "subtle"}
        icon={<Send24Regular />}
        className={styles.btns}
        onClick={() => navigate("/communication")}
      >
        Communication
      </Button> */}
      <Divider />

      <DrawerHeaderTitle>Manage</DrawerHeaderTitle>
      <div
        style={{ marginLeft: "12px", display: "flex", flexDirection: "column", gap: "4px" }}
      >
        {manageData.map((item) => {
          return (
            <Button
              key={item.name}
              appearance={isAction(item.path) ? "primary" : "subtle"}
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
