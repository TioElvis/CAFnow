import { z } from "zod";
import { UserRole } from "@/types/user";

export const schema = z.object({
  name: z.string().min(1, { message: "Campo richiesto" }),
  surname: z.string().min(1, { message: "Campo richiesto" }),
  email: z.string().min(1, { message: "Campo richiesto" }).email(),
  role: z.enum([UserRole.ADMIN], {
    errorMap: () => ({ message: "Campo richiesto" }),
  }),
});
