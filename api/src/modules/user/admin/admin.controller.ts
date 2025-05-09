import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Types } from "mongoose";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserRole } from "../../../schemas/user.schema";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Roles, RolesGuard } from "../../../guards/roles.guard";

@Controller("/admin")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.SUPER)
export class AdminController {
  constructor(private _UserService_: UserService) {}

  @Get("/find-all")
  @Roles("admin")
  async FindAll() {
    return await this._UserService_.FindAll(
      { role: UserRole.ADMIN },
      { password: false, finger_print: false },
    );
  }

  @Post("/create")
  async Create(@Body() body: CreateUserDto) {
    return await this._UserService_.Create({ ...body, role: UserRole.ADMIN });
  }

  @Patch("/update-by-id/:id")
  async Update(@Param("id") id: Types.ObjectId, @Body() body: UpdateAdminDto) {
    return await this._UserService_.Update(id, body);
  }

  @Delete("/delete-one/:id")
  async DeleteOne(@Param("id") id: Types.ObjectId) {
    return await this._UserService_.DeleteOne(id, UserRole.ADMIN);
  }

  @Delete("/delete-many")
  async DeleteMany(@Body() { ids }: { ids: Array<Types.ObjectId> }) {
    return await this._UserService_.DeleteMany(ids, UserRole.ADMIN);
  }
}
