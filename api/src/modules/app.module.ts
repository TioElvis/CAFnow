import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CAFModule } from "./caf/caf.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_ConfigService_: ConfigService) => ({
        uri: _ConfigService_.get<string>("DB_URI"),
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_ConfigService_: ConfigService) => ({
        secret: _ConfigService_.get<string>("JWT_SECRET"),
      }),
    }),
    PassportModule,
    UserModule,
    AuthModule,
    CAFModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy],
})
export class AppModule {}
