import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) { }

  @Post()
  async create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Get()
  async findAll() {
    return this.gradeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const grade = await this.gradeService.findOne(+id);
    if (!grade) throw new NotFoundException(`Grade #${id} not found`);
    return grade;
  }

  @Get('student/:studentId')
  async findByStudentId(@Param('studentId') studentId: string) {
    return this.gradeService.findByStudentId(+studentId);
  }

  @Get('group-subject/:groupSubjectId')
  async findByGroupSubjectId(@Param('groupSubjectId') groupSubjectId: string) {
    return this.gradeService.findByGroupSubjectId(+groupSubjectId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    const updated = await this.gradeService.update(+id, updateGradeDto);
    if (!updated) throw new NotFoundException(`Grade #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.gradeService.remove(+id);
    if (!deleted) throw new NotFoundException(`Grade #${id} not found`);
    return { deleted: true };
  }
}
