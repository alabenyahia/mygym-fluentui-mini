import { MoreVertical24Regular, Delete24Regular } from "@fluentui/react-icons";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
} from "@fluentui/react-components";

import useMembers from "../hooks/useMembers";
import { useState } from "react";

export const useColumns = () => {
  const { memberDeleteMutation } = useMembers();

  const deleteMember = (data: any) => {
    const id = data.id;
    memberDeleteMutation.mutate({
      id,
      data: { deletedAt: new Date() },
    });
  };

  const membersActions = {
    header: "Actions",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell data={value.row?.original} deleteFn={deleteMember} />
    ),
  };

  const membersColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Registered date",
      accessorKey: "registeredDate",
    },
    {
      header: "Membership",
      accessorKey: "membership",
    },
    {
      header: "Memberhsip Exp/date",
      accessorKey: "membershipExpirationDate",
    },
    membersActions,
  ];

  const membershipsColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Membership type",
      accessorKey: "membershipType",
    },
    {
      header: "Time-membership type",
      accessorKey: "timeType",
    },
    {
      header: "Time-membership quantity",
      accessorKey: "timeQuantity",
    },
    {
      header: "Session-membership quantity",
      accessorKey: "sessionQuantity",
    },
    //Add actions
  ];

  return { membersColumns, membershipsColumns };
};

const ActionsCell = ({ data, deleteFn }: any) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  return (
    <div style={{ textAlign: "end" }}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button
            size="small"
            appearance="subtle"
            icon={<MoreVertical24Regular />}
          />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem
              onClick={() => {
                setIsDeleteAlertOpen(true);
              }}
              icon={<Delete24Regular />}
            >
              Delete
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <DeleteAlert
        open={isDeleteAlertOpen}
        setOpen={setIsDeleteAlertOpen}
        deleteFn={() => {
          deleteFn(data);
          setIsDeleteAlertOpen(false);
        }}
        data={data}
      />
    </div>
  );
};

export const DeleteAlert = ({ open, setOpen, deleteFn, data }: any) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(_: any, data: any) => setOpen(data.open)}
      modalType="alert"
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete the member?</DialogTitle>
          <DialogContent>
            You are going to delete this member, are you sure?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={() => deleteFn(data)}>
              Delete
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
