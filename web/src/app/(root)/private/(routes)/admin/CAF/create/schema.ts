import { z } from "zod";
import { user } from "@/lib/schemas";

export const schema = z.object({
  name: z.string().min(1, { message: "Campo richiesto" }),
  super_manager: z.custom<z.infer<typeof user>>(
    (value) => {
      return value !== undefined && value !== null;
    },
    { message: "Campo richiesto" },
  ),
});
