import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user.service";
import { UserRole } from "../../../schemas/user.schema";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles, RolesGuard } from "../../../guards/roles.guard";

@Controller("admin")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("super")
export class AdminController {
  constructor(private _UserService_: UserService) {}

  @Get("find-all")
  @Roles("admin")
  async FindAll() {
    return await this._UserService_.FindAll(
      { $or: [{ role: UserRole.ADMIN }, { role: UserRole.SUPER }] },
      { password: false, finger_print: false },
    );
  }
}
