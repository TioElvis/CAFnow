"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <section className="w-full flex items-center justify-between px-2">
      <span className="text-sm">Theme</span>
      <div className="flex gap-2">
        <Button onClick={() => setTheme("light")} size="sm" variant="ghost">
          <SunIcon
            className={cn("h-4 w-4", theme === "light" && "text-yellow-600")}
          />
        </Button>
        <Button onClick={() => setTheme("dark")} size="sm" variant="ghost">
          <MoonIcon
            className={cn("h-4 w-4", theme === "dark" && "text-blue-600")}
          />
        </Button>
        <Button onClick={() => setTheme("system")} size="sm" variant="ghost">
          <LaptopIcon
            className={cn("h-4 w-4", theme === "system" && "text-primary")}
          />
        </Button>
      </div>
    </section>
  );
}
