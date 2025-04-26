import { Types } from "mongoose";
import { User } from "./user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class CAF {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  // A super_manager is required when creating a CAF
  @Prop({ type: Array<Types.ObjectId>, ref: User.name, required: true })
  super_manager: Array<Types.ObjectId>;
}

export const CAFSchema = SchemaFactory.createForClass(CAF);
