import { z } from "zod";

export const schema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().optional(),
});
