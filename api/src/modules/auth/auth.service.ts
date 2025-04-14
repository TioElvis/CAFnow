import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from "../../lib/constants";
import { Token } from "../../types";
import type { Model } from "mongoose";
import { compareSync } from "bcryptjs";
import { hash } from "../../lib/utils";
import type { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../schemas/user.schema";
import { UserService } from "../user/user.service";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  private domain: string | undefined = undefined;

  constructor(
    private _JwtService_: JwtService,
    private _UserService_: UserService,
    private _ConfigService_: ConfigService,
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
}
