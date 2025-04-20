import type {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
} from "mongoose";
import { Types } from "mongoose";
import { hashSync } from "bcryptjs";
import { hash } from "../../lib/utils";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserRole } from "../../schemas/user.schema";
import { HttpException, Injectable } from "@nestjs/common";
import { ResendProvider } from "../../providers/resend.provider";

@Injectable()
export class UserService {
  constructor(
    private _ResendProvider_: ResendProvider,
    @InjectModel(User.name) private _UserModel_: Model<User>,
  ) {}

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

  async FindAll(
    filter?: FilterQuery<User>,
    projection?: ProjectionType<User>,
    options?: QueryOptions,
  ) {
    try {
      const users = await this._UserModel_.find(
        filter || {},
        projection,
        options,
      );

      return users;
    } catch (error) {
      console.error(error);
      throw new HttpException("Errore nella ricerca degli utenti", 500);
    }
  }

  async Create(body: CreateUserDto & { role: UserRole }) {
    const user = await this._UserModel_.findOne({ email: body.email });

    if (user !== null) {
      throw new HttpException("Utente già esistente", 400);
    }

    const password = hash(16);

    const payload: User = {
      ...body,
      password: hashSync(password),
      finger_print: null, // Because we don't have a finger_print yet
    };

    try {
      await this._UserModel_.create(payload);

      await this._ResendProvider_.SendWelcomeMail({ ...body, password });

      return "Utente creato con successo";
    } catch (error) {
      console.error(error);
      throw new HttpException("Errore nel creare un nuovo utente", 500);
    }
  }
}
