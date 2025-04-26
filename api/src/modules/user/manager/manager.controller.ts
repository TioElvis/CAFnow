import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user.service";
import { Controller, UseGuards } from "@nestjs/common";
import { Roles, RolesGuard } from "../../../guards/roles.guard";

@Controller("manager")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("super", "admin")
export class ManagerController {
  constructor(private _UserService_: UserService) {}
}
