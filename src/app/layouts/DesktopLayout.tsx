import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main.ts";
import {
  Caption2Strong,
  Image,
  makeStyles,
  Card,
  Button,
} from "@fluentui/react-components";
import AvatarMenu from "./components/AvatarMenu.tsx";
import ToggleDarkMode from "./components/ToggleDarkMode.tsx";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Home24Regular,
  CalendarSettings24Regular,
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

export default function DesktopLayout({ children }: any) {
  const [isDark, _] = useAtom(isDarkTheme);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        width: "100%",
      }}
    >
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
          // borderRight: isDark ? "1px solid #141414  " : "1px solid #d7dde4",
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

      {location.pathname.includes("/manage") && <ManageSidebar />}

      <Card style={{ flex: 1, height: "100%" }}>
        <div style={{ height: "100%" }}>{children}</div>
      </Card>
    </div>
  );
}

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

const useManageDrawerBodyStyles = makeStyles({
  btns: {
    justifyContent: "flex-start",
    paddingLeft: "8px",
  },
});

function ManageDrawerBody() {
  const styles = useManageDrawerBodyStyles();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        marginTop: "12px",
      }}
    >
      <div
        style={{
          marginLeft: "7px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {manageData.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.name}
              appearance={isActive ? "primary" : "subtle"}
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

function ManageSidebar() {
  return (
    <DrawerInline
      open
      style={{
        width: "fit-content",
        minWidth: "210px",
        boxShadow: "0 0 2px rgba(0,0,0,0.24), 0 2px 4px rgba(0,0,0,0.28)",
      }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle>Manage</DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <ManageDrawerBody />
      </DrawerBody>
    </DrawerInline>
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

      <SideBarBtn path="/manage/members">
        <CalendarSettings24Regular />
        <Caption2Strong>Manage</Caption2Strong>
      </SideBarBtn>

      <SideBarBtn path="/reports">
        <ChartMultiple24Regular />
        <Caption2Strong>Reports</Caption2Strong>
      </SideBarBtn>

      {/* <SideBarBtn path="/calendar">
        <Calendar24Regular />
        <Caption2Strong>Calendar</Caption2Strong>
      </SideBarBtn> */}

      {/* <SideBarBtn path="/communication">
        <Send24Regular />
        <Caption2Strong>Communication</Caption2Strong>
      </SideBarBtn> */}
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
  let isActive = false;

  if (path === "/") {
    isActive = location.pathname === path;
  } else if (
    location.pathname.includes("/manage") &&
    path.includes("/manage")
  ) {
    isActive = true;
  } else {
    isActive = location.pathname.includes(path);
  }

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
