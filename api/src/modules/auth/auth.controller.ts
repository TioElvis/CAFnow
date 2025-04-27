import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import type { Request, Response } from "express";

@Controller("/auth")
export class AuthController {
  constructor(private _AuthService_: AuthService) {}

  @HttpCode(200)
  @Post("/sign-in")
  async SignIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this._AuthService_.SignIn(body, response);
  }

  @Patch("/logout")
  async Logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this._AuthService_.Logout(request, response);
  }

  /*
    Why did I create this endpoint?

    This endpoint was created to support server-side rendering (SSR) in a Next.js client.
    I encountered issues with accessing the "access_token" cookie during SSR requests,
    so I implemented this temporary access token as a workaround to authenticate those requests.
  */
  @Get("/temporary-access-token")
  async TemporaryAccessToken(@Req() request: Request) {
    return await this._AuthService_.TemporaryAccessToken(request);
  }

  /*
    Why did I create this endpoint?
    
    This endpoint verify the integrity of refresh_token so in Nextjs We can validate the refresh_token to protect routes
  */
  @Get("/check-refresh-token-integrity")
  async CheckRefreshTokenIntegrity(@Req() request: Request) {
    return await this._AuthService_.CheckRefreshTokenIntegrity(request);
  }

  /*
    Why did I create this endpoint?

    This endpoint return the cookie for the access_token and have a long duration
  */
  @Get("/refresh-access-token")
  async RefreshAccessToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this._AuthService_.RefreshAccessToken(request, response);
  }
}
