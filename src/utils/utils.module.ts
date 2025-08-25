import { Module } from '@nestjs/common';
import { Utils } from './utils';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [Utils],
  exports: [Utils],
})
export class UtilsModule {}
