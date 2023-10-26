import pb from "src/utils/db/pocketbase";
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  Avatar,
  Button,
  Card,
  makeStyles,
  Title3,
  Body2,
  Divider,
} from "@fluentui/react-components";
import { Link } from "react-router-dom";
import useLogout from "src/app/pages/auth/hooks/useLogout";
import {
  Settings24Regular,
  PersonCircle24Regular,
} from "@fluentui/react-icons";
import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main";

const useAvatarMenuStyles = makeStyles({
  menuPopover: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingRight: "0px",
    paddingLeft: "0px",
    maxWidth: "300px",
  },
});

export default function avatarMenu() {
  const styles = useAvatarMenuStyles();

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="outline"
          shape="circular"
          icon={
            <Avatar
              name={pb.authStore.model?.name}
              image={pb.authStore.model?.avatar}
            />
          }
        ></Button>
      </MenuTrigger>

      <MenuPopover className={styles.menuPopover}>
        <CardItem />
      </MenuPopover>
    </Menu>
  );
}

const useCardItemStyles = makeStyles({
  card: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  btn: {
    paddingLeft: "0px",
    justifyContent: "flex-start",
  },
});

function CardItem() {
  const styles = useCardItemStyles();
  const { logout } = useLogout();
  const [isDark, setIsDark] = useAtom(isDarkTheme);
  return (
    <Card className={styles.card} size="small" role="listitem">
      <div>
        <div
          style={{
            backgroundColor: isDark ? "#373737" : "#f0f0f0",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px",
            }}
          >
            <Title3>@{pb.authStore.model?.gymName}</Title3>
            <Button onClick={() => logout()}>Sign out</Button>
          </div>
        </div>

        <div
          style={{
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <Avatar
              name={pb.authStore.model?.name}
              image={pb.authStore.model?.avatar}
              size={72}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                marginBottom: "8px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Title3>{pb.authStore.model?.name}</Title3>
              <Body2>{pb.authStore.model?.email}</Body2>
            </div>

            <Divider />

            <div
              style={{
                marginTop: "3px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link to="/profile">
                <Button
                  className={styles.btn}
                  appearance="transparent"
                  icon={<PersonCircle24Regular />}
                >
                  Profile
                </Button>
              </Link>
              <Link to="/settings">
                <Button
                  className={styles.btn}
                  appearance="transparent"
                  icon={<Settings24Regular />}
                >
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
