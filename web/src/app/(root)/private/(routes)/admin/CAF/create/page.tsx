import { CreateCAFForm } from "./form";
import { getAllSuperManagers } from "../../../manager/actions";

export default async function Page() {
  const super_managers = await getAllSuperManagers();

  return <CreateCAFForm super_managers={super_managers} />;
}
