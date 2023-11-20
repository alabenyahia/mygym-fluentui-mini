import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import styles from "./managetable.module.css";
import { Card, Spinner, Button, Body2 } from "@fluentui/react-components";
import {
  ArrowSortDown20Regular,
  ArrowSortUp20Regular,
  Add24Regular,
} from "@fluentui/react-icons";

export default function ManageTable({
  searching,
  setSearching,
  columns,
  data,
  isLoading,
  loadingText,
  addBtnLabel,
  addBtnOnClick,
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
                    <Button
                      icon={<Add24Regular />}
                      size="medium"
                      onClick={addBtnOnClick}
                    >
                      {addBtnLabel}
                    </Button>
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
