import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  async findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subject = await this.subjectService.findOne(+id);
    if (!subject) throw new NotFoundException(`Subject #${id} not found`);
    return subject;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    const updated = await this.subjectService.update(+id, updateSubjectDto);
    if (!updated) throw new NotFoundException(`Subject #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.subjectService.remove(+id);
    if (!deleted) throw new NotFoundException(`Subject #${id} not found`);
    return { deleted: true };
  }
}
