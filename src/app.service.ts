import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const prefix = this.configService.get<string>('app.messagePrefix');
    return `${prefix} World!`;
  }
}
