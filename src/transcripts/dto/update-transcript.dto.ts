import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateTranscriptDto {
  @IsString()
  @IsOptional()
  courseName: string;

  @IsNumber()
  @IsOptional()
  grade: number;
}
