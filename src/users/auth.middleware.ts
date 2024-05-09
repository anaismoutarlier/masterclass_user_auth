import { Request, Response, NextFunction } from "express";
import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./jwtConstants";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(
    req: Request & { user?: { sub: number; type: string } },
    _: Response,
    next: NextFunction,
  ) {
    console.log("In middleware");
    const authHeader = req.headers["authorization"];
    // Authorization: "Bearer <token>" ou "Token <token>"
    const [type, token] = authHeader?.split(" ") || [];
    if (type !== "Token" || !token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log("Payload: ", payload);
      req.user = payload;
      next();
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
