import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@peasy-fit/db';
@Injectable()
export class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}
