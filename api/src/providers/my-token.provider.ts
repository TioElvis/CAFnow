import type { Token } from "../types";
import { JwtService } from "@nestjs/jwt";
import { HttpException, Injectable } from "@nestjs/common";
import { UserService } from "../modules/user/user.service";

@Injectable()
export class MyTokenProvider {
  constructor(
    private _JwtService_: JwtService,
    private _UserService_: UserService,
  ) {}

  async IsRefreshTokenValid(refresh_token: string | undefined) {
    let value: Token;

    if (refresh_token === undefined) {
      throw new HttpException("refresh_token non valido", 403);
    }

    try {
      value = await this._JwtService_.verifyAsync(refresh_token);
    } catch (error) {
      console.error(error);
      throw new HttpException("Errore nella validità del token", 500);
    }

    const user = await this._UserService_.FindById(value.user_id);

    if (value.finger_print !== user.finger_print) {
      throw new HttpException("refresh_token non valido", 403);
    }

    return value;
  }
}
