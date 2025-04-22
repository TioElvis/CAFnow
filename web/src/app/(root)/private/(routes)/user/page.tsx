import { findUserById } from "./actions";
import { NotFound } from "./components/not-found";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: Readonly<Props>) {
  try {
    const { id } = await searchParams;

    const { name, surname, email, role } = await findUserById(id as string);

    return (
      <MaxWidthWrapper>
        <div className="w-full h-32 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-[#C9302C] via-[#E55A2B] to-[#EFC98E]" />
        <div className="relative h-auto cursor-default">
          <div className="w-16 h-16 absolute -top-8 left-8 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#C9302C] via-[#E55A2B] to-[#EFC98E]">
            <span className="text-2xl font-bold">{name[0] + surname[0]}</span>
          </div>
        </div>
        <div className="mt-16" />
        <h2 className="text-2xl">
          <b>
            {name} {surname}!
          </b>
        </h2>
        <hr className="my-4" />
        <div className="flex flex-col gap-2 md:flex-row md:gap-0 justify-between">
          <div>
            <h3 className="font-semibold">Le sue informazioni:</h3>
            <p className="text-muted-foreground">Email: {email}</p>
            <p className="text-muted-foreground">
              Ruolo: {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  } catch (error) {
    console.error(error);
    return <NotFound />;
  }
}
