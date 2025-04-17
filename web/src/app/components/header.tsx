import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

const ITEMS = [
  {
    id: "about",
    text: "Su di noi",
  },
  {
    id: "services",
    text: "I nostri servizi",
  },
  {
    id: "contact",
    text: "Contattaci",
  },
] as const;

export function Header() {
  return (
    <header className="w-full h-16 sticky top-0 z-50 border-b bg-background/75 backdrop-blur-md">
      <MaxWidthWrapper className="flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">CAFnow</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-2">
            {ITEMS.map(({ id, text }) => {
              return (
                <li key={id}>
                  <Link href={`#${id}`}>
                    <Button className="text-foreground" variant="link">
                      {text}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link href="/auth/sign-in">
          <Button>Area riservata</Button>
        </Link>
      </MaxWidthWrapper>
    </header>
  );
}
