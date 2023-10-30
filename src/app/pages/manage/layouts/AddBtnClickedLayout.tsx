import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerFooter,
} from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useMediaQuery } from "react-responsive";


export const AddBtnClickedLayout = ({
  children,
  open,
  setOpen,
  title,
  createBtnOnClick,
}: any) => {
  const isMobile = useMediaQuery({ query: "(max-width: 920px)" });
  

  return (
    <Drawer
      open={open}
      position="end"
      onOpenChange={(_, state) => setOpen(state.open)}
      style={{ width: isMobile ? "100%" : "720px" }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => setOpen(false)}
            />
          }
        >
          {title}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>{children}</DrawerBody>
      <DrawerFooter style={{ alignSelf: "flex-end" }}>
        <Button
          size="large"
          appearance="subtle"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>

        <Button type="submit" form="add-form" appearance="primary" size="large" onClick={createBtnOnClick}>
          Create
        </Button>
      </DrawerFooter>
    </Drawer>
  );
};
