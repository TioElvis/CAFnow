import type { User } from "./user";

export interface CAF {
  _id: string;
  name: string;
  super_manager: User;
}
