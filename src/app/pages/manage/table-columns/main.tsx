import {
  MoreVertical24Regular,
  Delete24Regular,
  Edit24Regular,
  CalendarAdd24Regular,
  Payment24Filled,
  CalendarSettings24Regular,
  CalendarCancel24Regular,
  CalendarCheckmark24Regular,
  CalendarEdit24Regular,
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
  Avatar,
  Field,
  Dropdown,
  Option,
  Caption1,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";

import useMembers from "../hooks/useMembers";
import useMemberships from "../hooks/useMemberships";
import usePrograms from "../hooks/usePrograms";
import useClasses from "../hooks/useClasses";
import useGymStaff from "../hooks/useGymStaff";
import useCoaches from "../hooks/useCoaches";
import useDiscountCodes from "../hooks/useDiscountCodes";
import useTransactions from "../hooks/useTransactions";

import { useState } from "react";
import { atom, useAtom } from "jotai";

export const ismEditDrawerOpen = atom(false);
export const mEditData = atom(null);
import moment from "moment";

import { CheckmarkCircle24Filled } from "@fluentui/react-icons";

export const useColumns = () => {
  const { memberDeleteMutation, memberUpdateMutation } = useMembers();
  const { membershipDeleteMutation, membershipsQuery } = useMemberships();
  const { programDeleteMutation } = usePrograms();
  const { classDeleteMutation } = useClasses();
  const { gymStaffDeleteMutation } = useGymStaff();
  const { coachDeleteMutation } = useCoaches();
  const { discountCodeDeleteMutation } = useDiscountCodes();
  const { transactionDeleteMutation, transactionUpdateMutation } =
    useTransactions();

  const deleteRow = (mutation: any, data: any) => {
    const id = data.id;
    mutation.mutate({
      id,
      data: { deletedAt: new Date() },
    });
  };

  const markPayedTransaction = (mutation: any, data: any, isPaid: boolean) => {
    const id = data.id;
    mutation.mutate({
      id,
      data: { isPaid },
    });
  };

  const cancelMembership = (mutation: any, data: any) => {
    const id = data.id;
    mutation.mutate({
      id,
      data: { isMembershipCanceled: !data.isMembershipCanceled },
    });
  };

  const membersActions = {
    header: "",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell
        isMember={true}
        mutation={memberDeleteMutation}
        memberUpdateMutation={memberUpdateMutation}
        data={value.row?.original}
        deleteFn={deleteRow}
        cancelMembershipFn={cancelMembership}
        title="Delete member?"
        desc="Are you sure you want to delete this member?"
        membershipsQuery={membershipsQuery}
      />
    ),
  };

  const membershipsActions = {
    header: "",
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
    header: "",
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
    header: "",
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
    header: "",
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
    header: "",
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

  const discountCodesActions = {
    header: "",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell
        mutation={discountCodeDeleteMutation}
        data={value.row?.original}
        deleteFn={deleteRow}
        title="Delete Discount code?"
        desc="Are you sure you want to delete this discount code?"
      />
    ),
  };

  const transactionsActions = {
    header: "",
    accessorKey: "actions",
    footer: "Actions",
    enableSorting: false,
    cell: (value: any) => (
      <ActionsCell
        isTransaction={true}
        mutation={transactionDeleteMutation}
        markPayedMutation={transactionUpdateMutation}
        data={value.row?.original}
        markPayedFn={markPayedTransaction}
        title={
          value.row?.original?.isPaid
            ? "Mark transaction as unpaid?"
            : "Mark transaction as paid?"
        }
        desc={
          value.row?.original?.isPaid
            ? "Are you sure you want to mark this transaction as unpaid?"
            : "Are you sure you want to mark this transaction as paid?"
        }
      />
    ),
  };

  const membersColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Avatar",
      accessorKey: "avatar",
      cell: (value: any) => (
        <Avatar
          name={value.row?.original?.name}
          size={40}
          image={{ src: value.row?.original?.avatar }}
        />
      ),
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
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));

        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      },
    },
    {
      header: "Membership",
      accessorKey: "membership",
    },
    {
      header: "Membership Exp/date",
      accessorKey: "membershipExpirationDate",
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));

        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      },
    },
    {
      header: "Membership status",
      accessorKey: "isMembershipCanceled",
      cell: (value: any) =>
        !value.row?.original?.membership ? null : value.row?.original
            ?.isMembershipCanceled ? (
          <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <CheckmarkCircle24Filled primaryFill="red" /> Canceled
          </span>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <CheckmarkCircle24Filled primaryFill="green" /> Active
          </span>
        ),
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
      cell: (value: any) => value.row?.original?.price + " TND",
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
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));

        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      },
    },
    {
      header: "End date",
      accessorKey: "endDate",
      cell: (value: any) =>
        value.row?.original?.endDate === "" || !value.row?.original?.endDate
          ? ""
          : moment(value.row?.original?.endDate).format("LL"),
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));

        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      },
    },
    {
      header: "Start time",
      accessorKey: "startTime",
      cell: (value: any) =>
        moment(value.row?.original?.startTime).format("HH:mm"),
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));
        const mDateA = moment()
          .set("hour", dateA.get("hour"))
          .set("minute", dateA.get("minute"));
        const mDateB = moment()
          .set("hour", dateB.get("hour"))
          .set("minute", dateB.get("minute"));

        return mDateA.isBefore(mDateB) ? 1 : mDateA.isAfter(mDateB) ? -1 : 0;
      },
    },
    {
      header: "End time",
      accessorKey: "endTime",
      cell: (value: any) =>
        moment(value.row?.original?.endTime).format("HH:mm"),
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));
        const mDateA = moment()
          .set("hour", dateA.get("hour"))
          .set("minute", dateA.get("minute"));
        const mDateB = moment()
          .set("hour", dateB.get("hour"))
          .set("minute", dateB.get("minute"));

        return mDateA.isBefore(mDateB) ? 1 : mDateA.isAfter(mDateB) ? -1 : 0;
      },
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

  const discountCodesColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Code",
      accessorKey: "code",
    },
    {
      header: "Discount value ",
      accessorKey: "discountQuantity",
      cell: (value: any) =>
        `${value.row?.original?.discountQuantity}${
          value.row?.original?.discountType === "percentage" ? "%" : " TND"
        }`,
    },
    {
      header: "Does expire?",
      accessorKey: "expires",
      cell: (value: any) => (value.row?.original?.expires ? "Yes" : "No"),
    },
    {
      header: "Valid from",
      accessorKey: "validFrom",
      cell: (value: any) =>
        value.row?.original?.validFrom === "" || !value.row?.original?.validFrom
          ? ""
          : moment(value.row?.original?.validFrom).format("LL"),
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));

        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      },
    },
    {
      header: "Valid until",
      accessorKey: "validUntil",
      cell: (value: any) =>
        value.row?.original?.validUntil === "" ||
        !value.row?.original?.validUntil
          ? ""
          : moment(value.row?.original?.validUntil).format("LL"),
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));

        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      },
    },
    discountCodesActions,
  ];

  const transactionsColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Member",
      accessorKey: "member",
      cell: (value: any) =>
        `${value.row?.original?.expand?.member?.name}-${value.row?.original?.expand?.member?.id}`,
    },
    {
      header: "Membership",
      accessorKey: "membership",
      cell: (value: any) => `${value.row?.original?.expand?.membership?.name}`,
    },
    {
      header: "From",
      accessorKey: "from",
      cell: (value: any) =>
        value.row?.original?.from === "" || !value.row?.original?.from
          ? ""
          : moment(value.row?.original?.from).format("LL"),
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));

        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      },
    },

    {
      header: "To",
      accessorKey: "to",
      cell: (value: any) =>
        value.row?.original?.to === "" || !value.row?.original?.to
          ? ""
          : moment(value.row?.original?.to).format("LL"),
      sortingFn: (rowA: any, rowB: any, columnId: any) => {
        if (rowA === "" || !rowA || rowB === "" || !rowB) return;
        const dateA = moment(rowA.getValue(columnId));
        const dateB = moment(rowB.getValue(columnId));

        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      },
    },

    {
      header: "Price",
      accessorKey: "price",
      cell: (value: any) => `${value.row?.original?.price} TND`,
    },
    {
      header: "Status",
      accessorKey: "isPaid",
      cell: (value: any) =>
        value.row?.original?.isPaid ? (
          <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <CheckmarkCircle24Filled primaryFill="green" /> Paid
          </span>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <CheckmarkCircle24Filled primaryFill="red" /> Not Paid
          </span>
        ),
    },

    transactionsActions,
  ];

  return {
    membersColumns,
    membershipsColumns,
    programsColumns,
    classesColumns,
    gymStaffColumns,
    coachesColumns,
    discountCodesColumns,
    transactionsColumns,
  };
};

const ActionsCell = ({
  mutation,
  data,
  deleteFn,
  title,
  desc,
  isTransaction,
  isMember,
  markPayedMutation,
  memberUpdateMutation,
  cancelMembershipFn,
  markPayedFn,
  membershipsQuery,
}: any) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isMarkPayedDrawerOpen, setIsMarkPayedDrawerOpen] = useState(false);
  const [isExtendMembershipAlertOpen, setIsExtendMembershipAlertOpen] =
    useState(false);
  const [isChangeMembershipAlertOpen, setIsChangeMembershipAlertOpen] =
    useState(false);
  const [isManageMemberDialogOpen, setIsManageMemberDialogOpen] =
    useState(false);
  const [isCancelMembershipDrawerOpen, setIsCancelMembershipDrawerOpen] =
    useState(false);
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

            {!isTransaction && (
              <MenuItem
                onClick={() => {
                  //@ts-ignore
                  setEditData(data);
                  setIsEditDrawerOpen(true);
                }}
                icon={<Edit24Regular />}
              >
                Edit
              </MenuItem>
            )}

            {isTransaction && (
              <MenuItem
                onClick={() => {
                  setIsMarkPayedDrawerOpen(true);
                }}
                icon={<Payment24Filled />}
              >
                {data?.isPaid ? "Mark as unpaid" : "Mark as paid"}
              </MenuItem>
            )}

            {isMember && (
              <MenuItem
                disabled={!data?.membership}
                onClick={() => {
                  setIsExtendMembershipAlertOpen(true);
                }}
                icon={<CalendarAdd24Regular />}
              >
                Extend membership
              </MenuItem>
            )}

            {isMember && (
              <MenuItem
                disabled={!data?.membership}
                onClick={() => {
                  setIsChangeMembershipAlertOpen(true);
                }}
                icon={<CalendarEdit24Regular />}
              >
                Change membership
              </MenuItem>
            )}

            {isMember && (
              <MenuItem
                disabled={!data?.membership}
                onClick={() => {
                  setIsCancelMembershipDrawerOpen(true);
                }}
                icon={<CalendarCancel24Regular />}
              >
                {data.isMembershipCanceled
                  ? "Activate membership"
                  : "Cancel membership"}
              </MenuItem>
            )}
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

      {isTransaction && (
        <MarkPayedAlert
          mutation={markPayedMutation}
          open={isMarkPayedDrawerOpen}
          setOpen={setIsMarkPayedDrawerOpen}
          markPayedFn={markPayedFn}
          data={data}
          title={title}
          desc={desc}
        />
      )}

      {isMember && (
        <CancelMembershipAlert
          mutation={memberUpdateMutation}
          open={isCancelMembershipDrawerOpen}
          setOpen={setIsCancelMembershipDrawerOpen}
          fn={cancelMembershipFn}
          data={data}
          title={title}
          desc={desc}
        />
      )}

      {isMember && (
        <ChangeMembershipAlert
          mutation={memberUpdateMutation}
          open={isChangeMembershipAlertOpen}
          setOpen={setIsChangeMembershipAlertOpen}
          data={data}
          membershipsQuery={membershipsQuery}
        />
      )}

      {isMember && (
        <ExtendMembershipAlert
          mutation={memberUpdateMutation}
          open={isExtendMembershipAlertOpen}
          setOpen={setIsExtendMembershipAlertOpen}
          data={data}
          membershipsQuery={membershipsQuery}
        />
      )}
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

const MarkPayedAlert = ({
  mutation,
  open,
  setOpen,
  markPayedFn,
  data,
  isPaid,
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
              <Spinner label="Loading..." />
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
              onClick={() => markPayedFn(mutation, data, !data.isPaid)}
              disabled={mutation.isPending}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

const CancelMembershipAlert = ({ mutation, open, setOpen, fn, data }: any) => {
  //FIX BUG: Dialog is closing before the mutation(deleteFn) is finished

  //Dialog is closing immediately after clicking create button i want it to close after mutation is settled
  //I think the problem is because useMutation is rerending the component and the open state
  return (
    <Dialog open={open} modalType="alert">
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {data.isMembershipCanceled ? "Activate" : "Cancel"} {data.name}'s
            membership
          </DialogTitle>
          <DialogContent>
            {mutation.isPending ? (
              <Spinner label="Loading..." />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Avatar
                    name={data.name}
                    image={{
                      src: data.avatar,
                    }}
                    size={64}
                  />
                  <div>
                    <p style={{ fontWeight: 600 }}>{data.name}</p>
                    <p>
                      {data.email} {data.email && data.phone && " | "}{" "}
                      {data.phone}
                    </p>

                    {data.membership && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <CheckmarkCircle24Filled
                          color={
                            data.isMembershipCanceled ? "#ff0033" : "green"
                          }
                        />
                        <p style={{ fontWeight: 900 }}>{data.membership}</p>
                        <Caption1>
                          {moment(data.membershipExpirationDate).format("LL")}
                        </Caption1>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
                <span>
                  You are going to{" "}
                  {data.isMembershipCanceled ? "activate" : "cancel"}{" "}
                  {data.name}
                  's membership are you sure?{" "}
                </span>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                No
              </Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={() => fn()}
              disabled={mutation.isPending}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

const ChangeMembershipAlert = ({
  mutation,
  open,
  setOpen,
  data,
  membershipsQuery,
}: any) => {
  //FIX BUG: Dialog is closing before the mutation(deleteFn) is finished

  //Dialog is closing immediately after clicking create button i want it to close after mutation is settled
  //I think the problem is because useMutation is rerending the component and the open state
  const [selectedMembership, setSelectedMembership] = useState(data.membership);
  function changeMembership() {
    mutation.mutate({
      id: data.id,
      data: { membership: selectedMembership.id },
    });
  }

  return (
    <Dialog open={open} modalType="alert">
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Change {data.name}'s membership</DialogTitle>
          <DialogContent>
            {mutation.isPending ? (
              <Spinner label="Loading..." />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Avatar
                    name={data.name}
                    image={{
                      src: data.avatar,
                    }}
                    size={64}
                  />
                  <div>
                    <p style={{ fontWeight: 600 }}>{data.name}</p>
                    <p>
                      {data.email} {data.email && data.phone && " | "}{" "}
                      {data.phone}
                    </p>

                    {data.membership && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <CheckmarkCircle24Filled
                          color={
                            data.isMembershipCanceled ? "#ff0033" : "green"
                          }
                        />
                        <p style={{ fontWeight: 900 }}>{data.membership}</p>
                        <Caption1>
                          {moment(data.membershipExpirationDate).format("LL")}
                        </Caption1>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
                {membershipsQuery.isError ? (
                  <span style={{ color: "#ff0033" }}>
                    Error loading memberships
                  </span>
                ) : membershipsQuery.isPending ? (
                  <Spinner label="Loading memberships..." />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "24px",
                    }}
                  >
                    <label htmlFor="membership">Select new membership</label>
                    <Dropdown
                      id="membership"
                      value={selectedMembership.id}
                      onOptionSelect={(e, data) =>
                        setSelectedMembership(data.optionValue)
                      }
                      defaultValue={selectedMembership}
                      defaultSelectedOptions={[
                        selectedMembership.name +
                          "(" +
                          selectedMembership.price +
                          " TND)",
                      ]}
                    >
                      {membershipsQuery.data.map((membership: any) => (
                        <Option
                          text={
                            membership.name + "(" + membership.price + " TND)"
                          }
                          value={membership}
                        >
                          {membership.name + "(" + membership.price + " TND)"}
                        </Option>
                      ))}
                    </Dropdown>
                  </div>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={changeMembership}
              disabled={mutation.isPending}
            >
              Change
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

const ExtendMembershipAlert = ({
  mutation,
  open,
  setOpen,
  data,
  membershipsQuery,
}: any) => {
  //FIX BUG: Dialog is closing before the mutation(deleteFn) is finished

  //Dialog is closing immediately after clicking create button i want it to close after mutation is settled
  //I think the problem is because useMutation is rerending the component and the open state
  const [newExpDate, setNewExpDate] = useState(new Date());
  function extendMembership() {
    mutation.mutate({
      id: data.id,
      data: { membershipExpirationDate: newExpDate },
    });
  }

  return (
    <Dialog open={open} modalType="alert">
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Change {data.name}'s membership</DialogTitle>
          <DialogContent>
            {mutation.isPending ? (
              <Spinner label="Loading..." />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Avatar
                    name={data.name}
                    image={{
                      src: data.avatar,
                    }}
                    size={64}
                  />
                  <div>
                    <p style={{ fontWeight: 600 }}>{data.name}</p>
                    <p>
                      {data.email} {data.email && data.phone && " | "}{" "}
                      {data.phone}
                    </p>

                    {data.membership && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <CheckmarkCircle24Filled
                          color={
                            data.isMembershipCanceled ? "#ff0033" : "green"
                          }
                        />
                        <p style={{ fontWeight: 900 }}>{data.membership}</p>
                        <Caption1>
                          {moment(data.membershipExpirationDate).format("LL")}
                        </Caption1>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Field label="New membership expiration date">
                    <DatePicker
                      value={newExpDate}
                      onSelectDate={setNewExpDate}
                      placeholder="Select a date..."
                    />
                  </Field>
                </div>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={extendMembership}
              disabled={mutation.isPending}
            >
              Extend
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
