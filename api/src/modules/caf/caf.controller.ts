import { CAFService } from "./caf.service";
import { AuthGuard } from "@nestjs/passport";
import { UserRole } from "../../schemas/user.schema";
import { Controller, UseGuards } from "@nestjs/common";
import { Roles, RolesGuard } from "../../guards/roles.guard";

@Controller("caf")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.SUPER, UserRole.ADMIN)
export class CAFController {
  constructor(private _CAFService_: CAFService) {}
}
