import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  create(createStudentDto: CreateStudentDto) {
    const student = this.prisma.student.create({
      data: createStudentDto,
    });

    return student;
  }

  findAll() {
    const students = this.prisma.student.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return students;
  }

  findOne(id: string) {
    const student = this.prisma.student.findUnique({
      where: {
        id,
      },
    });
    return student;
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = this.prisma.student.update({
      where: {
        id,
      },
      data: updateStudentDto,
    });
    return student;
  }

  async delete(id: string) {
    const student = await this.prisma.student.findUnique({
      where: {
        id: id,
      },
    });

    if (!student) return null;

    await this.prisma.student.delete({
      where: {
        id,
      },
    });

    return student;
  }
}
