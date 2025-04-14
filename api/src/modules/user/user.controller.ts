import { Types } from "mongoose";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";

@Controller("user")
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private _UserService_: UserService) {}

  @Get("find-by-id/:id")
  async FindById(@Param("id") id: Types.ObjectId) {
    return await this._UserService_.FindById(id, {
      password: false,
      finger_print: false,
    });
  }
}
