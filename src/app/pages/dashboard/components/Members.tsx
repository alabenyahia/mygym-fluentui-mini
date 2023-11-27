import AppBreadcrumb from "src/app/pages/manage/components/ManageBreadcrumb";
import AppSearch from "src/app/pages/manage/components/ManageSeach";
import { useState } from "react";
import moment from "moment";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import styles from "src/app/pages/manage/components/managetable.module.css";
import { Spinner, Body2, Card } from "@fluentui/react-components";
import {
  ArrowSortDown20Regular,
  ArrowSortUp20Regular,
} from "@fluentui/react-icons";

import useMembers from "../../manage/hooks/useMembers";

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
    cell: (value: any) =>
      moment(value.row?.original?.registeredDate).format("LL"),
    sortingFn: (rowA: any, rowB: any, columnId: any) => {
      if (rowA === "" || !rowA || rowB === "" || !rowB) return;
      const dateA = moment(rowA.getValue(columnId));
      const dateB = moment(rowB.getValue(columnId));

      return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
    },
  },
  {
    header: "Membership ID",
    accessorKey: "membership",
  },
  {
    header: "Memberhsip Exp/date",
    accessorKey: "membershipExpirationDate",
    cell: (value: any) =>
      value.row?.original?.membershipExpirationDate
        ? moment(value.row?.original?.membershipExpirationDate).format("LL")
        : "",
    sortingFn: (rowA: any, rowB: any, columnId: any) => {
      if (rowA === "" || !rowA || rowB === "" || !rowB) return;
      const dateA = moment(rowA.getValue(columnId));
      const dateB = moment(rowB.getValue(columnId));

      return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
    },
  },
];

export default function Members() {
  const [searching, setSearching] = useState("");
  const { membersQuery } = useMembers();

  return (
    <Card style={{ flex: 1, maxHeight: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 0,
        }}
      >
        <AppBreadcrumb items={["Manage", "Members"]} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 0,
          gap: "6px",
        }}
      >
        <AppSearch value={searching} setValue={setSearching} />
      </div>

      <div style={{ overflow: "auto", flexGrow: 0 }}>
        <MembersTable
          searching={searching}
          setSearching={setSearching}
          columns={membersColumns}
          data={membersQuery.data}
          isLoading={membersQuery.isPending}
          loadingText="Loading members..."
        />
      </div>
    </Card>
  );
}

function MembersTable({
  searching,
  setSearching,
  columns,
  data,
  isLoading,
  loadingText,
}: any) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: searching,
    },
    onSortingChange: setSorting as any,
    onGlobalFilterChange: setSearching as any,
  });

  return (
    <div className={styles.container}>
      <Card>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className={styles.tr}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className={styles.th}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className={styles.thwrapper}>
                          <div>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </div>
                          <div style={{ display: "flex" }}>
                            {
                              {
                                asc: <ArrowSortUp20Regular />,
                                desc: <ArrowSortDown20Regular />,
                              }[
                                //@ts-ignore
                                header.column.getIsSorted() ?? null
                              ]
                            }
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {isLoading ? (
              <tr style={{ textAlign: "center" }} className={styles.tr}>
                <td colSpan={100} className={styles.td}>
                  <Spinner label={loadingText} />
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className={styles.tr}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className={styles.td}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr style={{ textAlign: "center" }} className={styles.tr}>
                <td colSpan={100} className={styles.td}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "12px",
                      margin: "6px 0",
                    }}
                  >
                    <Body2>No data found.</Body2>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
