import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
  TEMPORARY_TOKEN_EXPIRES,
} from "../../lib/constants";
import type { Model } from "mongoose";
import { compareSync } from "bcryptjs";
import { hash } from "../../lib/utils";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import type { Request, Response } from "express";
import { User } from "../../schemas/user.schema";
import type { Cookies, Token } from "../../types";
import { UserService } from "../user/user.service";
import { HttpException, Injectable } from "@nestjs/common";
import { MyTokenProvider } from "../../providers/my-token.provider";

@Injectable()
export class AuthService {
  private domain: string | undefined = undefined;

  constructor(
    private _JwtService_: JwtService,
    private _UserService_: UserService,
    private _ConfigService_: ConfigService,
    private _MyTokenProvider_: MyTokenProvider,
    @InjectModel(User.name) private _UserModel_: Model<User>,
  ) {
    // Configure domain to send cookies
    if (process.env.NODE_ENV === "production") {
      this.domain = `.${this._ConfigService_.get<string>("DOMAIN")}`;
    }
  }

  async SignIn(body: SignInDto, response: Response) {
    const { email, password } = body;
    const user = await this._UserModel_.findOne({ email });

    if (user === null || compareSync(password, user.password) === false) {
      throw new HttpException("Le credenziali non sono valide", 400);
    }

    try {
      const access_token = await this._JwtService_.signAsync(
        {
          type: "access",
          user_id: user._id,
        } satisfies Token,
        { expiresIn: ACCESS_TOKEN_EXPIRES },
      );

      response.cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: this.domain,
        path: "/",
        maxAge: ACCESS_TOKEN_EXPIRES,
      });

      const finger_print = hash(24);

      const refresh_token = await this._JwtService_.signAsync(
        {
          type: "refresh",
          user_id: user._id,
          finger_print: finger_print,
        } satisfies Token,
        { expiresIn: REFRESH_TOKEN_EXPIRES },
      );

      response.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: this.domain,
        path: "/",
        maxAge: REFRESH_TOKEN_EXPIRES,
      });

      user.finger_print = finger_print;
      await user.save();

      return { access_token, refresh_token };
    } catch (error) {
      console.error(error);
      throw new HttpException("Error nel sign-in", 500);
    }
  }

  async Logout(request: Request, response: Response) {
    const refresh_token = (request.cookies as Cookies).refresh_token;
    const value =
      await this._MyTokenProvider_.IsRefreshTokenValid(refresh_token);

    const user = await this._UserService_.FindById(value.user_id);

    try {
      user.finger_print = null;

      response.cookie("access_token", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: this.domain,
        path: "/",
        maxAge: 0,
      });

      response.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: this.domain,
        path: "/",
        maxAge: 0,
      });

      await user.save();

      return "La chiusura dell sessione è andata a buon fine";
    } catch (error) {
      console.error(error);
      throw new HttpException("Error nel logout", 500);
    }
  }

  async TemporaryAccessToken(request: Request) {
    const refresh_token = (request.cookies as Cookies).refresh_token;
    const value =
      await this._MyTokenProvider_.IsRefreshTokenValid(refresh_token);

    try {
      const access_token = await this._JwtService_.signAsync(
        {
          type: "access",
          user_id: value.user_id,
        } satisfies Token,
        { expiresIn: TEMPORARY_TOKEN_EXPIRES },
      );

      return { access_token };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Error nel creare un access_token temporaneo",
        500,
      );
    }
  }

  async CheckRefreshTokenIntegrity(request: Request) {
    const refresh_token = (request.cookies as Cookies).refresh_token;
    await this._MyTokenProvider_.IsRefreshTokenValid(refresh_token);

    try {
      return { refresh_token };
    } catch (error) {
      console.error(error);
      throw new HttpException("Errore nel controllare il refresh_token", 500);
    }
  }

  async RefreshAccessToken(request: Request, response: Response) {
    const refresh_token = (request.cookies as Cookies).refresh_token;
    const value =
      await this._MyTokenProvider_.IsRefreshTokenValid(refresh_token);

    try {
      const access_token = await this._JwtService_.signAsync(
        {
          type: "access",
          user_id: value.user_id,
        } satisfies Token,
        { expiresIn: ACCESS_TOKEN_EXPIRES },
      );

      response.cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: this.domain,
        path: "/",
        maxAge: ACCESS_TOKEN_EXPIRES,
      });

      return { access_token };
    } catch (error) {
      console.error(error);
      throw new HttpException("Error nel creare un access_token", 500);
    }
  }
}
