import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsServiceImplementation } from './implementation/projects-service-implementation';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [ProjectsController],
  providers: [
    {
      provide: ProjectsService,
      useClass: ProjectsServiceImplementation,
    },
  ],
})
export class ProjectsModule {}
