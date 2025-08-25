import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { BidsModule } from './bids/bids.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MilestonesModule } from './milestones/milestones.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    BidsModule,
    AuthModule,
    MilestonesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
