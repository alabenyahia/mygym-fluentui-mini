import { Button } from "@fluentui/react-components";
import { MoreVertical24Regular } from "@fluentui/react-icons";

const actions = {
  header: "Actions",
  accessorKey: "actions",
  footer: "Actions",
  enableSorting: false,
  cell: (value: any) => (
    <div style={{ textAlign: "end" }}>
      <Button
        size="small"
        onClick={() => console.log(value)}
        appearance="subtle"
        icon={<MoreVertical24Regular />}
      />
    </div>
  ),
}

export const membersColumns = [
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
  actions
]


export const membershipsColumns = [
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
  actions
]



