"use client";
import { useContext } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { TableContext } from "@/context/table";
import { Button } from "@/components/ui/button";

export function DataTablePagination() {
  const { table } = useContext(TableContext)!;

  return (
    <section className="w-full flex items-center justify-end gap-4">
      <div className="text-sm font-medium">
        Pagina {table.getState().pagination.pageIndex + 1} di{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}>
          <ChevronsRight />
        </Button>
      </div>
    </section>
  );
}
