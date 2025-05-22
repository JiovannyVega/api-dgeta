import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { FamilyMemberService } from './family-member.service';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';

@Controller('family-member')
export class FamilyMemberController {
  constructor(private readonly familyMemberService: FamilyMemberService) { }

  @Post()
  async create(@Body() createFamilyMemberDto: CreateFamilyMemberDto) {
    return this.familyMemberService.create(createFamilyMemberDto);
  }

  @Get()
  async findAll() {
    return this.familyMemberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const member = await this.familyMemberService.findOne(+id);
    if (!member) throw new NotFoundException(`FamilyMember #${id} not found`);
    return member;
  }

  @Get('student/:studentId')
  async findByStudentId(@Param('studentId') studentId: string) {
    return this.familyMemberService.findByStudentId(+studentId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFamilyMemberDto: UpdateFamilyMemberDto) {
    const updated = await this.familyMemberService.update(+id, updateFamilyMemberDto);
    if (!updated) throw new NotFoundException(`FamilyMember #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.familyMemberService.remove(+id);
    if (!deleted) throw new NotFoundException(`FamilyMember #${id} not found`);
    return { deleted: true };
  }
}
