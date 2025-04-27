import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export function NotFoundUser() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">Utente non trovato</h2>
      <p className="mt-4 text-lg">
        Il profilo che stai cercando non esiste o è stato rimosso.
      </p>
    </MaxWidthWrapper>
  );
}
