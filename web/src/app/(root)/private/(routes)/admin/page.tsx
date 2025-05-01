import Link from "next/link";
import { findAllAdmins } from "./actions";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { TableProvider } from "@/context/table";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableGlobalFilter } from "@/components/data-table-global-filter";
import { DataTableDeleteRowsSelected } from "@/components/data-table-delete-rows-selected";

export const dynamic = "force-dynamic";

export default async function Page() {
  const admins = await findAllAdmins();

  return (
    <div className="container mx-auto py-10">
      <TableProvider data={admins} columns={columns} name="admin">
        <section className="space-y-4">
          <div className="w-full flex flex-col items-center justify-between gap-4 lg:flex-row">
            <DataTableGlobalFilter className="w-full lg:w-96" />
            <div className="w-full flex gap-2 lg:w-auto">
              <DataTableDeleteRowsSelected />
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
