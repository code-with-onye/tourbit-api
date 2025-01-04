import { IsNotEmpty, IsMongoId, IsInt, IsBoolean } from 'class-validator';

export class ProgressDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsMongoId()
  tour: string;

  @IsNotEmpty()
  @IsInt()
  completedSteps: number;

  @IsBoolean()
  isCompleted;
}
