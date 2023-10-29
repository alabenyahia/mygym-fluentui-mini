import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import styles from "./managetable.module.css";
import { Card } from "@fluentui/react-components";
import {
  ArrowSortDown20Regular,
  ArrowSortUp20Regular,
} from "@fluentui/react-icons";


export default function ManageTable({ searching, setSearching, columns, data }: any) {
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
                              }[header.column.getIsSorted() ?? null]
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
            {table.getRowModel().rows.length > 0 ? (
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
                  No data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
