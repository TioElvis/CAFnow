import { CreateCAFForm } from "./form";
import { findAllSuperManagers } from "../../manager/actions";

export default async function Page() {
  return <CreateCAFForm super_managers={await findAllSuperManagers()} />;
}
