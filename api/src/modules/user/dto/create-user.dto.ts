import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsEmail({
    host_whitelist: ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"],
  })
  @IsNotEmpty()
  email: string;
}
