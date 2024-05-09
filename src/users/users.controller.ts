import { Controller, Get, Param, Post, Body, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Token non requis
  @Post("signup")
  signUpUser() {
    return "OK";
  }

  // Token non requis
  @Post("signin")
  signInUser(@Body() body: { email: string; password: string }) {
    return this.usersService.signInUser(body);
  }

  // Token requis
  @Patch()
  updateUser() {
    return "OK";
  }

  // Token requis
  @Get(":userId")
  getUser(@Param("userId") userId: string) {
    return this.usersService.getUser(userId);
  }
}
