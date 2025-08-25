import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectsDto } from './data/dto/create-projects.dto';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProjectDto: CreateProjectsDto,
    @CurrentUser() user: any,
  ): Promise<CreateProjectsDto> {
    return await this.projectsService.create(createProjectDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @CurrentUser() user: any
  ): Promise<any[]> {
    return await this.projectsService.findAll(user);
  }
}
