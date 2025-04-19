"use client";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { TableContext } from "@/context/table";
import { InputHTMLAttributes, useContext } from "react";

export function DataTableGlobalFilter({
  className,
  ...props
}: Readonly<InputHTMLAttributes<HTMLInputElement>>) {
  const { globalFilter, setGlobalFilter } = useContext(TableContext)!;

  return (
    <Input
      placeholder="Cerca per tutti i campi..."
      value={globalFilter ?? ""}
      onChange={(event) => setGlobalFilter(event.target.value)}
      className={cn(className)}
      {...props}
    />
  );
}
