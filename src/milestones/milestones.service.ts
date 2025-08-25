import { CreateMilestonesDto } from './data/dto/create-milestones.dto';

export abstract class MilestonesService {
  abstract create(
    createMilestoneDto: CreateMilestonesDto,
    user: any,
  ): Promise<CreateMilestonesDto>;
  abstract findAll(
    user: any,
    projectId: string
  ): Promise<CreateMilestonesDto[]>;
}
