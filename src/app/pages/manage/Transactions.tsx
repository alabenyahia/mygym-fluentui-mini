import { useColumns } from "./table-columns/main";
import useTransactions from "./hooks/useTransactions";
import AppBreadcrumb from "./components/ManageBreadcrumb";
import AppSearch from "./components/ManageSeach";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import styles from "./components/managetable.module.css";
import { Card, Spinner, Body2, Button } from "@fluentui/react-components";
import {
  ArrowSortDown20Regular,
  ArrowSortUp20Regular,
  Filter24Regular,
} from "@fluentui/react-icons";

export default function Programs() {
  const { transactionsQuery } = useTransactions();
  const { transactionsColumns } = useColumns();

  const programsProps = {
    tableColumns: transactionsColumns,
    tableData: transactionsQuery.data || [],
    tableLoading: transactionsQuery.isFetching || transactionsQuery.isLoading,
    tableLoadingText: "Loading transactions...",
    breadcrumbItems: ["Manage", "Transactions"],
    addBtnLabel: "New program",
    filterBtnOnClick: () => {
      console.log("filter transactions clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...programsProps} />
    </>
  );
}

const ManageRightLayout = ({
  tableColumns,
  tableData,
  tableLoading,
  tableLoadingText,
  breadcrumbItems,
  filterBtnOnClick,
}: any) => {
  const [searching, setSearching] = useState("");

  return (
    <Card style={{ flex: 1, boxShadow: "none", height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 0,
        }}
      >
        <AppBreadcrumb items={breadcrumbItems} />
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
        <Button
          appearance="primary"
          icon={<Filter24Regular />}
          size="medium"
          onClick={filterBtnOnClick}
        ></Button>
      </div>

      <div style={{ overflow: "auto", flexGrow: 0 }}>
        <AppTable
          searching={searching}
          setSearching={setSearching}
          columns={tableColumns}
          data={tableData}
          isLoading={tableLoading}
          loadingText={tableLoadingText}
        />
      </div>
    </Card>
  );
};

function AppTable({
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
