import type { Request } from "express";
import { Reflector } from "@nestjs/core";
import type { User } from "../schemas/user.schema";
import type { ExecutionContext } from "@nestjs/common";
import { CanActivate, Injectable, SetMetadata } from "@nestjs/common";

// Use this guard with jwt strategy
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private _Reflector_: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    if (user === undefined) {
      return false;
    }

    const roles = this._Reflector_.get<string[]>("roles", context.getHandler());

    return roles.includes((user as User).role);
  }
}

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
