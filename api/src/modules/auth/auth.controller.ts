import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import type { Request, Response } from "express";
import { Body, Controller, HttpCode, Post, Req, Res } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private _AuthService_: AuthService) {}

  @HttpCode(200)
  @Post("sign-in")
  async SignIn(
    @Body() body: SignInDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this._AuthService_.SignIn(body, request, response);
  }
}
