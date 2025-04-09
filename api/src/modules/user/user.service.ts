import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../schemas/user.schema";
import { HttpException, Injectable } from "@nestjs/common";
import { Types, type Model, type ProjectionType } from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private _UserModel_: Model<User>) {}

  async FindById(id: Types.ObjectId, projection?: ProjectionType<User>) {
    if (Types.ObjectId.isValid(id) === false) {
      throw new HttpException("Invalid id", 400);
    }

    const user = await this._UserModel_.findById(id, projection);

    if (user === null) {
      throw new HttpException("User not found", 404);
    }

    return user;
  }
}
