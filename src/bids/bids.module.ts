import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsServiceImplementation } from './implementation/bids-service-implementation';
import { BidsService } from './bids.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [BidsController],
  providers: [
    {
      provide: BidsService,
      useClass: BidsServiceImplementation,
    },
  ],
  exports: [],
})
export class BidsModule {}
