import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // res.json() / res.send()
    return 'Hello World!';
  }
}
