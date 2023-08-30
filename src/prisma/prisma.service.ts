import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Interface onModuleInit -> Se conecta ao banco assim que a aplicação é iniciada.
  async onModuleInit() {
    await this.$connect();
  }
  
}
