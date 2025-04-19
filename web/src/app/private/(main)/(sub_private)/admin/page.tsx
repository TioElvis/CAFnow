import { getAllAdmins } from "./actions";
import { columns } from "./components/columns";
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
          <DataTableGlobalFilter className="w-full md:w-96" />
          <DataTable />
          <DataTablePagination />
        </section>
      </TableProvider>
    </div>
  );
}
