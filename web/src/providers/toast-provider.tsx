"use client";
import { Fragment, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export function ToastProvider({ children }: Readonly<Props>) {
  const { dismiss } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    dismiss("toggle");
  }, [pathname]);

  return <Fragment>{children}</Fragment>;
}
