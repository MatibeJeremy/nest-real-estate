import { ProjectsService } from '../projects.service';
import { CreateProjectsDto } from '../data/dto/create-projects.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Utils } from '../../utils/utils';

@Injectable()
export class ProjectsServiceImplementation extends ProjectsService {
  constructor(
    private readonly utils: Utils,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }

  async create(createProjectsDto: CreateProjectsDto, user: any): Promise<any> {
    const userDetails = await this.utils.validateUserPermissions(
      user,
      'HOME_OWNER',
    );
    return this.prismaService.project.create({
      data: {
        ...createProjectsDto,
        ownerId: userDetails.userId,
      },
    });
  }

  async findAll(user: any): Promise<any[]> {
    let result: any[];
    const userDetails = await this.prismaService.user.findUnique({
      where: { email: user.email },
      select: { role: true, userId: true, email: true },
    });
    if (userDetails.role === 'HOME_OWNER') {
      result = await this.prismaService.project.findMany({
        where: { ownerId: userDetails.userId },
      });
    } else {
      result = await this.prismaService.project.findMany();
    }
    return result;
  }
}
