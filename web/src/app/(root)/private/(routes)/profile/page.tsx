"use client";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/user";
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default function Page() {
  const { name, surname, email, role } = useContext(UserContext)!;

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
        Ciao{" "}
        <b>
          {name} {surname}!
        </b>
      </h2>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 md:flex-row md:gap-0 justify-between">
        <div>
          <h3 className="font-semibold">Le tue informazioni:</h3>
          <p className="text-muted-foreground">Email: {email}</p>
          <p className="text-muted-foreground">
            Ruolo: {role.charAt(0).toUpperCase() + role.slice(1)}
          </p>
        </div>
        <Link href="/private/settings">
          <Button>Modifica le tue informazioni</Button>
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
