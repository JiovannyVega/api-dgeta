import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  async findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const teacher = await this.teacherService.findOne(+id);
    if (!teacher) throw new NotFoundException(`Teacher #${id} not found`);
    return teacher;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    const updated = await this.teacherService.update(+id, updateTeacherDto);
    if (!updated) throw new NotFoundException(`Teacher #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.teacherService.remove(+id);
    if (!deleted) throw new NotFoundException(`Teacher #${id} not found`);
    return { deleted: true };
  }
}
