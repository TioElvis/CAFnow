import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <span className="flex flex-col items-center justify-center gap-2">
        <LoaderCircleIcon className="animate-spin" />
        <p>Caricando...</p>
      </span>
    </div>
  );
}
