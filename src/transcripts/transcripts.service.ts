import { Injectable } from '@nestjs/common';
import { CreateTranscriptDto, UpdateTranscriptDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TranscriptsService {
  constructor(private prisma: PrismaService) {}

  async create(createTranscriptDto: CreateTranscriptDto) {
    const transactionResult = await this.prisma.$transaction(async (prisma) => {
      const transcript = await prisma.transcript.create({
        data: createTranscriptDto,
      });

      const aggregations = await prisma.transcript.aggregate({
        where: {
          studentId: createTranscriptDto.studentId,
        },
        _avg: {
          grade: true,
        },
      });

      const newGpa = aggregations._avg.grade;

      await prisma.student.update({
        where: {
          id: createTranscriptDto.studentId,
        },
        data: {
          gpa: newGpa,
        },
      });

      return transcript;
    });

    return transactionResult;
  }

  findAll() {
    const transcripts = this.prisma.transcript.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return transcripts;
  }

  findOne(id: string) {
    const transcript = this.prisma.transcript.findUnique({
      where: {
        id,
      },
    });
    return transcript;
  }

  async update(id: string, updateTranscriptDto: UpdateTranscriptDto) {
    const transactionResult = await this.prisma.$transaction(async (prisma) => {
      await prisma.transcript.update({
        where: {
          id,
        },
        data: updateTranscriptDto,
      });

      const transcript = await prisma.transcript.findUnique({
        where: {
          id,
        },
      });

      const aggregations = await prisma.transcript.aggregate({
        where: {
          studentId: transcript.studentId,
        },
        _avg: {
          grade: true,
        },
      });

      const newGpa = aggregations._avg.grade;

      await prisma.student.update({
        where: {
          id: transcript.studentId,
        },
        data: {
          gpa: newGpa,
        },
      });

      return transcript;
    });

    return transactionResult;
  }

  async delete(id: string) {
    const transactionResult = await this.prisma.$transaction(async (prisma) => {
      const transcript = await prisma.transcript.findUnique({
        where: {
          id,
        },
      });

      await prisma.transcript.delete({
        where: {
          id,
        },
      });

      const aggregations = await prisma.transcript.aggregate({
        where: {
          studentId: transcript.studentId,
        },
        _avg: {
          grade: true,
        },
      });

      const newGpa = aggregations._avg.grade;

      await prisma.student.update({
        where: {
          id: transcript.studentId,
        },
        data: {
          gpa: newGpa || 0,
        },
      });

      return transcript;
    });

    return transactionResult;
  }
}
