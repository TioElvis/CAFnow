import type { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../../schemas/user.schema";

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private _UserModel_: Model<User>) {}
}
