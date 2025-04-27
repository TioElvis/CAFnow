import { IsIn, IsNotEmpty } from "class-validator";
import { UserRole } from "../../../../schemas/user.schema";

export class FilterUsersByRoleDto {
  @IsIn([UserRole.SUPER_MANAGER, UserRole.MANAGER, "all"])
  @IsNotEmpty()
  role: UserRole.SUPER_MANAGER | UserRole.MANAGER | "all";
}
