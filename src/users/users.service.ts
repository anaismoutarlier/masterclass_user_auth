import { Injectable, UnauthorizedException } from "@nestjs/common";
import { users } from "./users.mock";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}
  getUser(userId: string, user: { sub: number; type: string }) {
    if (user.type === "admin" || String(user.sub) !== userId)
      throw new UnauthorizedException();
    return users.find((user) => String(user.id) === userId);
  }

  async signInUser(body: { email: string; password: string }) {
    const { email, password } = body;
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) throw new UnauthorizedException();
    const payload = {
      sub: user.id,
      type: user.type,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
