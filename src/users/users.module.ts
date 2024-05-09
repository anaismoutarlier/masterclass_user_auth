import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./jwtConstants";
import { AuthMiddleware } from "./auth.middleware";
@Module({
  imports: [JwtModule.register(jwtConstants)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude("users/signup", "users/signin")
      .forRoutes("users", "users/*");
  }
}
