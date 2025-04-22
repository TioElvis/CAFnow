import { z } from "zod";
import { UserRole } from "@/types/user";

export const schema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().optional(),
  role: z
    .enum(
      [UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.CLIENT],
      {
        errorMap: () => ({ message: "Campo richiesto" }),
      },
    )
    .optional(),
});
