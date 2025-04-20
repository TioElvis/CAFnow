import { CreateUserDto } from "../../dto/create-user.dto";
import { UserRole } from "../../../../schemas/user.schema";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto extends CreateUserDto {
  @IsIn([UserRole.ADMIN])
  @IsString()
  @IsNotEmpty()
  role: UserRole.ADMIN;
}
