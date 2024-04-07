import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    var data = {
      message: 'สวัสดีจ้า',
      author: 'YoYo',
      version: '1.0.0'
    };
    return data;
  }
}
