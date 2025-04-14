import { Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../schemas/user.schema";
import type { Model, ProjectionType } from "mongoose";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private _UserModel_: Model<User>) {}

  async FindById(id: Types.ObjectId, projection?: ProjectionType<User>) {
    if (Types.ObjectId.isValid(id) === false) {
      throw new HttpException("id non valida", 400);
    }

    const user = await this._UserModel_.findById(id, projection);

    if (user === null) {
      throw new HttpException("Utente non trovato", 404);
    }

    return user;
  }
}
