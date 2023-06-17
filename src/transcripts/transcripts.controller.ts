import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TranscriptsService } from './transcripts.service';
import { CreateTranscriptDto } from './dto/create-transcript.dto';
import { UpdateTranscriptDto } from './dto/update-transcript.dto';

@Controller('transcripts')
export class TranscriptsController {
  constructor(private readonly transcriptsService: TranscriptsService) {}

  @Post()
  async create(@Body() createTranscriptDto: CreateTranscriptDto) {
    const transcript = await this.transcriptsService.create(
      createTranscriptDto,
    );

    return {
      message: 'Transcript created successfully',
      data: transcript,
    };
  }

  @Get()
  async findAll() {
    const transcripts = await this.transcriptsService.findAll();

    return {
      message: 'Transcripts retrieved successfully',
      data: transcripts,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transcript = await this.transcriptsService.findOne(id);

    if (!transcript) {
      return { message: 'Transcript not found' };
    }

    return {
      message: 'Transcript retrieved successfully',
      data: transcript,
    };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranscriptDto: UpdateTranscriptDto,
  ) {
    return this.transcriptsService.update(id, updateTranscriptDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transcriptsService.delete(id);
  }
}
