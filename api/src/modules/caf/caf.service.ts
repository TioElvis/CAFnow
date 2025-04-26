import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CAF } from "../../schemas/caf.schema";
import { UserService } from "../user/user.service";
import { CreateCAFDto } from "./dto/create-caf.dto";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class CAFService {
  constructor(
    private _UserService_: UserService,
    @InjectModel(CAF.name) private _CAFModule_: Model<CAF>,
  ) {}

  async Create(body: CreateCAFDto) {
    const caf = await this._CAFModule_.findOne({ name: body.name });

    if (caf !== null) {
      throw new HttpException("CAF già esistente", 400);
    }

    await this._UserService_.FindById(body.super_manager);

    const payload: CAF = {
      ...body,
    };

    try {
      await this._CAFModule_.create(payload);

      return "CAF creato con successo";
    } catch (error) {
      console.error(error);
      throw new HttpException("Errore nel creare un CAF", 500);
    }
  }
}
