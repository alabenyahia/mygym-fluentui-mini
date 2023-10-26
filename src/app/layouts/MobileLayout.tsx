import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
} from "@fluentui/react-components/unstable";
import {
  Button,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  shorthands,
  tokens,
  useId,
  Image,
  Title3,
  Avatar,
} from "@fluentui/react-components";
import { Dismiss24Regular, Navigation24Regular } from "@fluentui/react-icons";
import { useState } from "react";
import pb from "src/utils/db/pocketbase";
import AvatarMenu from "src/app/layouts/components/AvatarMenu";

export default function MobileLayout({ children }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <header
        style={{
          backgroundColor: "#f0f0f0",
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
        <AvatarMenu/>
        </nav>
      </header>
      <main>{children}</main>
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
        <p>Drawer content</p>
      </DrawerBody>
    </Drawer>
  );
}


