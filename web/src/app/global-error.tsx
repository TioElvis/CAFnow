"use client";
import "./globals.css";
import type { ErrorPage } from "@/types";

export default function GlobalError({ error }: Readonly<ErrorPage>) {
  return (
    <html>
      <head>
        <title>CAFnow</title>
      </head>
      <body>
        <h2>Ci dispiace qualcosa non è andata a buon fine!</h2>
        <p>Error: {error.message}</p>
      </body>
    </html>
  );
}
