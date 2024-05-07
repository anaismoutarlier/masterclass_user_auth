import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// const router = express.Router();
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // router.get("/")
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/*
const router = express.Router();

router.get()

router.post();

///etc
 */
