import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBidsDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}
