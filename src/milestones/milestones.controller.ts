import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateMilestonesDto } from './data/dto/create-milestones.dto';
import { MilestonesService } from './milestones.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';

@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestonesService: MilestonesService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createMilestoneDto: CreateMilestonesDto,
    @CurrentUser() user: any,
  ): Promise<CreateMilestonesDto> {
    return await this.milestonesService.create(createMilestoneDto, user);
  }

  @Get(':projectId')
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Param('projectId') projectId: string,
    @CurrentUser() user: any,
  ): Promise<CreateMilestonesDto[]> {
    return await this.milestonesService.findAll(user, projectId);
  }
}
