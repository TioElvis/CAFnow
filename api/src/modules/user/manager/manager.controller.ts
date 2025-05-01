import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user.service";
import { UserRole } from "../../../schemas/user.schema";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles, RolesGuard } from "../../../guards/roles.guard";

@Controller("/manager")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.SUPER, UserRole.ADMIN)
export class ManagerController {
  constructor(private _UserService_: UserService) {}

  @Get("/find-all")
  async FindAll() {
    return await this._UserService_.FindAll(
      { $or: [{ role: UserRole.SUPER_MANAGER }, { role: UserRole.MANAGER }] },
      { password: false, finger_print: false },
    );
  }
}
