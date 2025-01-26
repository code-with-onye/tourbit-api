import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class StepDto {

  @IsString()
  @IsNotEmpty()
  selector: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsOptional()
  show: boolean;
}

export class TourDto {
  @IsNotEmpty()
  @IsOptional()
  userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['draft', 'active', 'inactive'])
  status: string;

  @ValidateNested({ each: true })
  @Type(() => StepDto)
  @IsArray()
  @IsOptional()
  steps: StepDto[];
}
