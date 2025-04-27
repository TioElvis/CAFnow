import { CAFService } from "./caf.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateCAFDto } from "./dto/create-caf.dto";
import { UserRole } from "../../schemas/user.schema";
import { Roles, RolesGuard } from "../../guards/roles.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

@Controller("/CAF")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.SUPER, UserRole.ADMIN)
export class CAFController {
  constructor(private _CAFService_: CAFService) {}

  @Post("/create")
  async Create(@Body() body: CreateCAFDto) {
    return await this._CAFService_.Create(body);
  }

  @Get("/find-all")
  async FindAll() {
    return await this._CAFService_.FindAll();
  }
}
