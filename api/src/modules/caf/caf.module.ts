import { Module } from "@nestjs/common";
import { CAFService } from "./caf.service";
import { CAFController } from "./caf.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CAF, CAFSchema } from "../../schemas/caf.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: CAF.name, schema: CAFSchema }])],
  controllers: [CAFController],
  providers: [CAFService],
})
export class CAFModule {}
