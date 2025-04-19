import { AuthGuard } from "@nestjs/passport";
import { Controller, UseGuards } from "@nestjs/common";
import { Roles, RolesGuard } from "../../../guards/roles.guard";

@Controller("admin")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
export class AdminController {}
