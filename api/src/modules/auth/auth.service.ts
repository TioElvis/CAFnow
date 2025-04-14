import type { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../schemas/user.schema";
import { UserService } from "../user/user.service";

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
}
