import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { AdminService } from "./admin/admin.service";
import { AdminController } from "./admin/admin.controller";
import { User, UserSchema } from "../../schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, AdminController],
  providers: [UserService, AdminService],
  exports: [UserService],
})
export class UserModule {}
