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
  import { useIsMutating } from "@tanstack/react-query";
  import { ismEditDrawerOpen, mEditData } from "../table-columns/main";
  import { useAtom } from 'jotai';

  export const EditBtnClickedLayout = ({
    title,
    body
  }: any) => {
    const isMobile = useMediaQuery({ query: "(max-width: 920px)" });
    const isMutatingMembers = useIsMutating({
      mutationKey: ["memberUpdate"],
    });
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);
    
  
    return (
      <Drawer
        open={isEditDrawerOpen}
        position="end"
        onOpenChange={(_, state) => setIsEditDrawerOpen(state.open)}
        style={{ width: isMobile ? "100%" : "720px" }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsEditDrawerOpen(false)}
              />
            }
          >
            {title}
          </DrawerHeaderTitle>
        </DrawerHeader>
  
        <DrawerBody>{body}</DrawerBody>
        <DrawerFooter style={{ alignSelf: "flex-end" }}>
          <Button
            size="large"
            appearance="subtle"
            onClick={() => {
                setIsEditDrawerOpen(false);
            }}
          >
            Cancel
          </Button>
  
          <Button
            type="submit"
            form="add-form"
            appearance="primary"
            size="large"
            disabled={isMutatingMembers > 0}
          >
            Edit
          </Button>
        </DrawerFooter>
      </Drawer>
    );
  };
  