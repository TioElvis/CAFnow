"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ColumnDef,
  ColumnFiltersState,
  Table,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { TUseState } from "@/types";
import { createContext, useState } from "react";

interface Context {
  data: Array<any>;
  columns: Array<ColumnDef<any>>;
  table: Table<any>;
  globalFilter: string;
  setGlobalFilter: TUseState<string>;
}

export const TableContext = createContext<Context | null>(null);

interface Props {
  children: React.ReactNode;
  data: Array<any>;
  columns: Array<ColumnDef<any>>;
}

export function TableProvider({ children, ...props }: Readonly<Props>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      globalFilter,
    },
  });

  const values: Context = {
    data: props.data,
    columns: props.columns,
    table,
    globalFilter,
    setGlobalFilter,
  };

  return (
    <TableContext.Provider value={values}>{children}</TableContext.Provider>
  );
}
