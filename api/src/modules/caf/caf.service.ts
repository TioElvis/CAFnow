import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CAF } from "../../schemas/caf.schema";

@Injectable()
export class CAFService {
  constructor(@InjectModel(CAF.name) private _CAFModule_: Model<CAF>) {}
}
