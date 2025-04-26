import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { AdminController } from "./admin/admin.controller";
import { User, UserSchema } from "../../schemas/user.schema";
import { ResendProvider } from "../../providers/resend.provider";
import { ManagerController } from "./manager/manager.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, AdminController, ManagerController],
  providers: [UserService, ResendProvider],
  exports: [UserService],
})
export class UserModule {}
