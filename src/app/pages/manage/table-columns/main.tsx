import {
  MoreVertical24Regular,
  Delete24Regular,
  Edit24Regular,
} from "@fluentui/react-icons";
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
  Spinner,
} from "@fluentui/react-components";

import useMembers from "../hooks/useMembers";
import useMemberships from "../hooks/useMemberships";
import usePrograms from "../hooks/usePrograms";
import { useState } from "react";
import { atom, useAtom } from "jotai";

export const ismEditDrawerOpen = atom(false);
export const mEditData = atom(null);

export const useColumns = () => {
  const { memberDeleteMutation } = useMembers();
  const { membershipDeleteMutation } = useMemberships();
  const { programDeleteMutation } = usePrograms();

  const deleteRow = (mutation: any, data: any) => {
    const id = data.id;
    mutation.mutate({
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
      <ActionsCell
        mutation={memberDeleteMutation}
        data={value.row?.original}
        deleteFn={deleteRow}
        title="Delete member?"
        desc="Are you sure you want to delete this member?"
      />
    ),
  };

  const membershipsActions = {
    header: "Actions",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell
        mutation={membershipDeleteMutation}
        data={value.row?.original}
        deleteFn={deleteRow}
        title="Delete membership?"
        desc="Are you sure you want to delete this membership?"
      />
    ),
  };

  const programsActions = {
    header: "Actions",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell
        mutation={programDeleteMutation}
        data={value.row?.original}
        deleteFn={deleteRow}
        title="Delete program?"
        desc="Are you sure you want to delete this program?"
      />
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
    membershipsActions,
  ];

  const programsColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    programsActions,
  ];

  return { membersColumns, membershipsColumns, programsColumns };
};

const ActionsCell = ({ mutation, data, deleteFn, title, desc }: any) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [editData, setEditData] = useAtom(mEditData);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);
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

            <MenuItem
              onClick={() => {
                setEditData(data);
                setIsEditDrawerOpen(true);
              }}
              icon={<Edit24Regular />}
            >
              Edit
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <DeleteAlert
        mutation={mutation}
        open={isDeleteAlertOpen}
        setOpen={setIsDeleteAlertOpen}
        deleteFn={deleteFn}
        data={data}
        title={title}
        desc={desc}
      />
    </div>
  );
};

const DeleteAlert = ({
  mutation,
  open,
  setOpen,
  deleteFn,
  data,
  title,
  desc,
}: any) => {
  //FIX BUG: Dialog is closing before the mutation(deleteFn) is finished

  //Dialog is closing immediately after clicking create button i want it to close after mutation is settled
  //I think the problem is because useMutation is rerending the component and the open state
  return (
    <Dialog open={open} modalType="alert">
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {mutation.isPending ? (
              <Spinner label="Deleting..." />
            ) : (
              <span>{desc}</span>
            )}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={() => deleteFn(mutation, data)}
              disabled={mutation.isPending}
            >
              Delete
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
