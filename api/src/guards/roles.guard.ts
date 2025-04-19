import type { Request } from "express";
import { Reflector } from "@nestjs/core";
import type { ExecutionContext } from "@nestjs/common";
import { UserRole, type User } from "../schemas/user.schema";
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

    if (user.role === UserRole.SUPER) {
      return true;
    }

    const roles = this._Reflector_.getAllAndOverride<string[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    return roles.includes((user as User).role);
  }
}

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
