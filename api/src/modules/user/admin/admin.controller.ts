import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user.service";
import { UserRole } from "../../../schemas/user.schema";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Roles, RolesGuard } from "../../../guards/roles.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

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

  @Post()
  async Create(@Body() body: CreateAdminDto) {
    return await this._UserService_.Create(body);
  }
}
