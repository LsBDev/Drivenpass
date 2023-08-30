import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna o módulo Global. Uma vez que é importado em algum módulo (normalmente no AppModule), fica disponível para todos os módulos.
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
