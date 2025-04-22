import { IsIn } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UserRole } from "../../../../schemas/user.schema";

export class UpdateAdminDto extends PartialType(CreateUserDto) {
  @IsIn([UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.CLIENT])
  role?:
    | UserRole.ADMIN
    | UserRole.MANAGER
    | UserRole.EMPLOYEE
    | UserRole.CLIENT;
}
