import type { Request } from "express";
import { Injectable } from "@nestjs/common";
import type { Cookies, Token } from "../types";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private _UserService_: UserService,
    private _ConfigService_: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: _ConfigService_.get<string>("JWT_SECRET")!,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const access_token = (request.cookies as Cookies).access_token;

          if (access_token === undefined) {
            return null;
          }

          return access_token;
        },
      ]),
    });
  }

  async validate(payload: Token) {
    if (payload.type !== "access") {
      return false;
    }

    const user = await this._UserService_.FindById(payload.user_id, {
      password: false,
    });

    return user;
  }
}
