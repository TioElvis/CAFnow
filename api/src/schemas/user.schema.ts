import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  EMPLOYEE = "employee",
  CLIENT = "client",
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  surname: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  role: UserRole;

  @Prop({ type: String, default: null })
  finger_print: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
