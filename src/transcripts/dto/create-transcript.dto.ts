import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTranscriptDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  courseName: string;

  @IsNumber()
  @IsNotEmpty()
  grade: number;
}
