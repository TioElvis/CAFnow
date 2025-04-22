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
import { UpdateUserDto } from "./dto/update-user.dto";
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

  async Update(id: Types.ObjectId, body: UpdateUserDto & { role?: UserRole }) {
    const user = await this.FindById(id);

    const existingUser = await this._UserModel_.findOne({ email: body.email });

    if (
      existingUser !== null &&
      existingUser._id.toString() !== id.toString()
    ) {
      throw new HttpException("Utente già esistente con questa email", 400);
    }

    try {
      await user.updateOne({ $set: { ...body } });

      return "Utente aggiornato con successo";
    } catch (error) {
      console.error(error);
      throw new HttpException("Errore nell'aggiornare l'utente", 500);
    }
  }

  async DeleteOne(id: Types.ObjectId, role: UserRole) {
    const user = await this.FindById(id);

    if (user.role !== role) {
      throw new HttpException(
        `Questa ruta solo permette l'eliminazione dei ${role}s`,
        400,
      );
    }

    try {
      await user.deleteOne();

      return "Utente eliminato con successo";
    } catch (error) {
      console.error(error);
      throw new HttpException("Errore nell'eliminazione dell'utente", 500);
    }
  }

  async DeleteMany(ids: Array<Types.ObjectId>, role: UserRole) {
    const promises = ids.map((id) => this.DeleteOne(id, role));

    try {
      await Promise.all(promises);

      return "Utenti eliminati con successo";
    } catch (error) {
      console.error(error);
      throw new HttpException("Errore nell'eliminazione di alcuni utenti", 500);
    }
  }
}
