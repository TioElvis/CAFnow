import { z } from "zod";
import { UserRole } from "@/types/user";

export const user = z.object({
  _id: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  role: z.enum([
    UserRole.SUPER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.SUPER_MANAGER,
    UserRole.EMPLOYEE,
    UserRole.CLIENT,
  ]),
  finger_print: z.string().optional(),
  createdAt: z.date(),
  updateAt: z.date(),
});
