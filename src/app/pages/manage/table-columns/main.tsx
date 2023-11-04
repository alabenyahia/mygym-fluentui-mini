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
import useClasses from "../hooks/useClasses";
import useGymStaff from "../hooks/useGymStaff";
import useCoaches from "../hooks/useCoaches";

import { useState } from "react";
import { atom, useAtom } from "jotai";

export const ismEditDrawerOpen = atom(false);
export const mEditData = atom(null);
import moment from "moment";

export const useColumns = () => {
  const { memberDeleteMutation } = useMembers();
  const { membershipDeleteMutation } = useMemberships();
  const { programDeleteMutation } = usePrograms();
  const { classDeleteMutation } = useClasses();
  const { gymStaffDeleteMutation } = useGymStaff();
  const { coachDeleteMutation } = useCoaches();

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

  const classesActions = {
    header: "Actions",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell
        mutation={classDeleteMutation}
        data={value.row?.original}
        deleteFn={deleteRow}
        title="Delete class?"
        desc="Are you sure you want to delete this class?"
      />
    ),
  };

  const gymStaffActions = {
    header: "Actions",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell
        mutation={gymStaffDeleteMutation}
        data={value.row?.original}
        deleteFn={deleteRow}
        title="Delete Gym staff?"
        desc="Are you sure you want to delete this gym staff?"
      />
    ),
  };

  const coachesActions = {
    header: "Actions",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell
        mutation={coachDeleteMutation}
        data={value.row?.original}
        deleteFn={deleteRow}
        title="Delete Coach?"
        desc="Are you sure you want to delete this coach?"
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

  const classesColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Program",
      accessorKey: "program",
      cell: (value: any) => value.row?.original?.expand?.program?.name,

    },
    {
      header: "Class type",
      accessorKey: "classType",
    },
    {
      header: "Start date",
      accessorKey: "startDate",
      cell: (value: any) => moment(value.row?.original?.startDate).format("LL"),
    },
    {
      header: "End date",
      accessorKey: "endDate",
      cell: (value: any) =>
        value.row?.original?.endDate === "" || !value.row?.original?.endDate
          ? ""
          : moment(value.row?.original?.endDate).format("LL"),
    },
    {
      header: "StartTime",
      accessorKey: "startTime",
      cell: (value: any) =>
        moment(value.row?.original?.startTime).format("HH:mm"),
    },
    {
      header: "endTime",
      accessorKey: "endTime",
      cell: (value: any) =>
        moment(value.row?.original?.endTime).format("HH:mm"),
    },
    {
      header: "Recurrent days",
      accessorKey: "recurrentDays",
      cell: (value: any) => {
        const recDays =
          value.row?.original?.recurrentDays.length > 0 &&
          value.row?.original?.recurrentDays
            ? value.row?.original?.recurrentDays
            : [];
        if (recDays.length === 0) return "";
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            {recDays.map((day: any) => {
              let dayName = day.substring(0, 4);
              dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
              return (
                <p
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: 999,
                    backgroundColor: "#546485",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {dayName}
                </p>
              );
            })}
          </div>
        );
      },
    },
    {
      header: "Class limit",
      accessorKey: "classLimit",
    },
    classesActions,
  ];

  const gymStaffColumns = [
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
      header: "Role",
      accessorKey: "role",
    },
    gymStaffActions,
  ];

  const coachesColumns = [
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
      header: "Program",
      accessorKey: "program",
      cell: (value: any) => value.row?.original?.expand?.program?.name,
    },
    coachesActions,
  ];

  return {
    membersColumns,
    membershipsColumns,
    programsColumns,
    classesColumns,
    gymStaffColumns,
    coachesColumns
  };
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
