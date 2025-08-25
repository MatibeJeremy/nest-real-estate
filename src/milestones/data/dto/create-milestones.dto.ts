import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMilestonesDto {
  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
