import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export function Footer() {
  return (
    <footer className="bg-muted px-12 py-4">
      <MaxWidthWrapper className="flex flex-col items-center justify-center md:flex-row md:justify-between">
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CAFnow. All rights reserved.
        </span>
        <div className="flex gap-2">
          <Link href="/privacy">
            <Button className="text-foreground" variant="link">
              Informativa sulla privacy
            </Button>
          </Link>
          <Link href="/terms">
            <Button className="text-foreground" variant="link">
              Termini di servizio
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
