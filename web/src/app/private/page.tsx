"use client";
import { UserContext } from "@/context/user";
import { Fragment, useContext } from "react";

export default function Page() {
  const { name, surname } = useContext(UserContext)!;

  return (
    <Fragment>
      Ciao {name} {surname}
    </Fragment>
  );
}
