import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DcMGg5B } from "@/components/svg/DcMGg5B";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default function Page() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center lg:flex-row space-y-8 md:space-y-0">
      <MaxWidthWrapper className="w-full h-auto lg:w-1/2 flex flex-col items-center justify-center text-center lg:px-2 xl:px-0 gap-4">
        <h2 className="text-6xl lg:text-8xl font-bold text-muted-foreground">
          404
        </h2>
        <h3 className="text-4xl lg:text-5xl font-bold text-muted-foreground">
          Pagina non trovata
        </h3>
        <p className="text-lg lg:text-xl text-muted-foreground">
          Ci dispiace, non abbiamo potuto trovate la pagina che stai cercando
        </p>
        <Link href="/">
          <Button size="lg">
            Ritorna al Home <ArrowLeftIcon />
          </Button>
        </Link>
      </MaxWidthWrapper>
      <section className="w-1/2 lg:h-full flex lg:items-end justify-center">
        <DcMGg5B />
      </section>
    </main>
  );
}
