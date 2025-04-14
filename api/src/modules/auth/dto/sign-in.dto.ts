import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsEmail({
    host_whitelist: ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"],
  })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
