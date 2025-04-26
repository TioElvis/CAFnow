import type { Types } from "mongoose";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateCAFDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  super_manager: Types.ObjectId;
}
