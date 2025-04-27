import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user.service";
import { UserRole } from "../../../schemas/user.schema";
import { Roles, RolesGuard } from "../../../guards/roles.guard";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { FilterUsersByRoleDto } from "./dto/filter-users-by-role.dto";

@Controller("/manager")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.SUPER, UserRole.ADMIN)
export class ManagerController {
  constructor(private _UserService_: UserService) {}

  @Get("/find-all")
  async FindAll(@Query() { role }: FilterUsersByRoleDto) {
    if (role !== "all") {
      return await this._UserService_.FindAll(
        { role },
        { password: false, finger_print: false },
      );
    }

    return await this._UserService_.FindAll(
      { $or: [{ role: UserRole.SUPER_MANAGER }, { role: UserRole.MANAGER }] },
      { password: false, finger_print: false },
    );
  }
}
