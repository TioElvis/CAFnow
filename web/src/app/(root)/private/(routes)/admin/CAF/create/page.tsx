import { CreateCAFForm } from "./form";
import { getAllSuperManagers } from "../../../manager/actions";

export default async function Page() {
  try {
    const super_managers = await getAllSuperManagers();

    return <CreateCAFForm super_managers={super_managers} />;
  } catch (error) {
    console.error(error);
    return <>Error in Super managers page</>;
  }
}
