import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserServiceImplementation } from './implementation/user-service-implementation';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useClass: UserServiceImplementation,
    },
  ],
  exports: [],
})
export class UsersModule {}
