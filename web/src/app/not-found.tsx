import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DcMGg5B } from "@/components/svg/DcMGg5B";

export default function Page() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center lg:flex-row space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 gap-4">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-muted-foreground">
          404
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-muted-foreground">
          Pagina non trovata
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
          Ci dispiace, non abbiamo potuto trovate la pagina che stai cercando
        </p>
        <Link href="/">
          <Button size="lg">
            Ritorna al Home <ArrowLeftIcon />
          </Button>
        </Link>
      </section>
      <section className="w-1/2 lg:h-full flex lg:items-end justify-center">
        <DcMGg5B />
      </section>
    </main>
  );
}
