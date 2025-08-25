import { MilestonesService } from '../milestones.service';
import { CreateMilestonesDto } from '../data/dto/create-milestones.dto';
import { Injectable } from '@nestjs/common';
import { Utils } from '../../utils/utils';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MilestonesServiceImplementation extends MilestonesService {
  constructor(
    private readonly utils: Utils,
    private readonly prismaService: PrismaService
  ) {
    super();
  }
  async create(
    createMilestoneDto: CreateMilestonesDto,
    user: any
  ): Promise<CreateMilestonesDto> {
    await this.utils.validateUserPermissions(user, "PROJECT_MANAGER");
    return this.prismaService.milestone.create({
      data: {
        ...createMilestoneDto,
      },
    })
  }

  findAll(user: any, projectId: string): Promise<CreateMilestonesDto[]> {
    return this.prismaService.milestone.findMany({
      where:{projectId : Number(projectId)}
    });
  }
}
