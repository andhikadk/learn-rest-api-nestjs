import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.create(createStudentDto);

    return {
      message: 'Student created successfully',
      data: student,
    };
  }

  @Get()
  async findAll() {
    const students = await this.studentsService.findAll();

    return {
      message: 'Students retrieved successfully',
      data: students,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentsService.findOne(id);

    if (!student) {
      return { message: 'Student not found' };
    }

    return {
      message: 'Student retrieved successfully',
      data: student,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const student = await this.studentsService.update(id, updateStudentDto);

    if (!student) {
      return { message: 'Student not found' };
    }

    return {
      message: 'Student updated successfully',
      data: student,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const student = await this.studentsService.delete(id);

    if (!student) {
      return { message: 'Student not found' };
    }

    return {
      message: 'Student deleted successfully',
      data: student,
    };
  }
}
