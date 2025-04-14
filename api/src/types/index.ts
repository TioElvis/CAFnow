import type { Types } from "mongoose";

export interface Token {
  user_id: Types.ObjectId;
  iat?: number;
  exp?: number;

  finger_print?: string; // This attribute is only for refresh_token
  type: "access" | "refresh";
}

export interface Cookies {
  access_token: string | undefined;
  refresh_token: string | undefined;
}
