import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { GroupSubjectService } from './group-subject.service';
import { CreateGroupSubjectDto } from './dto/create-group-subject.dto';
import { UpdateGroupSubjectDto } from './dto/update-group-subject.dto';

@Controller('group-subject')
export class GroupSubjectController {
  constructor(private readonly groupSubjectService: GroupSubjectService) { }

  @Post()
  async create(@Body() createGroupSubjectDto: CreateGroupSubjectDto) {
    return this.groupSubjectService.create(createGroupSubjectDto);
  }

  @Get()
  async findAll() {
    return this.groupSubjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const groupSubject = await this.groupSubjectService.findOne(+id);
    if (!groupSubject) throw new NotFoundException(`GroupSubject #${id} not found`);
    return groupSubject;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGroupSubjectDto: UpdateGroupSubjectDto) {
    const updated = await this.groupSubjectService.update(+id, updateGroupSubjectDto);
    if (!updated) throw new NotFoundException(`GroupSubject #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.groupSubjectService.remove(+id);
    if (!deleted) throw new NotFoundException(`GroupSubject #${id} not found`);
    return { deleted: true };
  }
}
