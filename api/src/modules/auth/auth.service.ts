import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from "../../lib/constants";
import type { Model } from "mongoose";
import { compareSync } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { getClientInfo } from "../../lib/utils";
import { User } from "../../schemas/user.schema";
import type { Request, Response } from "express";
import type { Cookies, Token } from "../../types";
import { UserService } from "../user/user.service";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  private domain: string | undefined;

  constructor(
    private _JwtService_: JwtService,
    private _UserService_: UserService,
    private _ConfigService_: ConfigService,
    @InjectModel(User.name) private _UserModel_: Model<User>,
  ) {
    if (process.env.NODE_ENV === "production") {
      this.domain = `.${this._ConfigService_.get<string>("DOMAIN")}`;
    } else {
      this.domain = undefined;
    }
  }

  async SignIn(body: SignInDto, request: Request, response: Response) {
    const { email, password } = body;

    const user = await this._UserModel_.findOne({ email });

    if (user === null || compareSync(password, user.password) === false) {
      throw new HttpException("Invalid credentials", 400);
    }

    const { ip_address, user_agent } = getClientInfo(request);

    const payload: Token = {
      user_id: user._id,
      ip_address,
      user_agent,
    };

    try {
      const access_token = await this._JwtService_.signAsync(payload, {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      });

      const refresh_token = await this._JwtService_.signAsync(payload, {
        expiresIn: REFRESH_TOKEN_EXPIRES,
      });

      user.ip_address = ip_address;
      user.user_agent = user_agent;

      await user.save();

      response.cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        domain: this.domain,
        path: "/",
        maxAge: ACCESS_TOKEN_EXPIRES,
      });

      response.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        domain: this.domain,
        path: "/",
        maxAge: REFRESH_TOKEN_EXPIRES,
      });

      return "ok";
    } catch (error) {
      throw new HttpException({ error, text: "Internal server error" }, 500);
    }
  }

  async RefreshAccessToken(request: Request, response: Response) {
    let value: Token;
    const refresh_token = (request.cookies as Cookies).refresh_token;

    if (refresh_token === undefined) {
      throw new HttpException("Invalid refresh_token", 403);
    }

    try {
      value = await this._JwtService_.verifyAsync(refresh_token);
    } catch (error) {
      throw new HttpException(
        { error, text: "Failed to verify refresh token" },
        500,
      );
    }

    const user = await this._UserService_.FindById(value.user_id, {
      password: false,
    });

    if (
      value.ip_address !== user.ip_address ||
      value.user_agent !== user.user_agent
    ) {
      throw new HttpException("Invalid refresh_token", 403);
    }

    const { ip_address, user_agent } = getClientInfo(request);

    const payload: Token = {
      user_id: user._id,
      ip_address,
      user_agent,
    };

    try {
      const access_token = await this._JwtService_.signAsync(payload, {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      });

      response.cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        domain: this.domain,
        path: "/",
        maxAge: ACCESS_TOKEN_EXPIRES,
      });

      return "ok";
    } catch (error) {
      throw new HttpException({ error, text: "Internal server error" }, 500);
    }
  }
}
