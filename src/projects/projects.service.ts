import { CreateProjectsDto } from './data/dto/create-projects.dto';

export abstract class ProjectsService {
  abstract create(
    createProjectsDto: CreateProjectsDto,
    user: any,
  ): Promise<CreateProjectsDto>;

  abstract findAll(user:any): Promise<any[]>;
}
