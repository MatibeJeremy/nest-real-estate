import { Module } from '@nestjs/common';
import { MilestonesController } from './milestones.controller';
import { MilestonesServiceImplementation } from './implementation/milestones-service-implementation';
import { MilestonesService } from './milestones.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [MilestonesController],
  providers: [
    {
      provide: MilestonesService,
      useClass: MilestonesServiceImplementation,
    },
  ],
  exports: [
    {
      provide: MilestonesService,
      useClass: MilestonesServiceImplementation,
    },
  ],
})
export class MilestonesModule {}
