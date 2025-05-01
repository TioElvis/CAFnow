export interface Token {
  user_id: string;
  iat?: number;
  exp?: number;

  finger_print?: string; // This attribute is only for refresh_token
  type: "access" | "refresh";
}
