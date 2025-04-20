import Link from "next/link";
import { getAllAdmins } from "./actions";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { TableProvider } from "@/context/table";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableGlobalFilter } from "@/components/data-table-global-filter";

export default async function Page() {
  const admins = await getAllAdmins();

  return (
    <div className="container mx-auto py-10">
      <TableProvider data={admins} columns={columns}>
        <section className="space-y-4">
          <div className="w-full flex flex-col items-center justify-between gap-4 md:gap-0 md:flex-row">
            <DataTableGlobalFilter className="w-full md:w-96" />
            <div className="w-full flex gap-2 md:w-auto">
              <Link href="/private/admin/create" className="flex-grow">
                <Button className="w-full">Crea un&#39;amministratore</Button>
              </Link>
            </div>
          </div>
          <DataTable />
          <DataTablePagination />
        </section>
      </TableProvider>
    </div>
  );
}
