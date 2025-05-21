import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SpecialityService } from './specialty.service';
import { CreateSpecialitieDto } from './dto/create-specialty.dto';
import { UpdateSpecialitieDto } from './dto/update-specialty.dto';

@Controller('speciality')
export class SpecialityController {
  constructor(private readonly specialtyService: SpecialityService) { }

  @Post()
  async create(@Body() createSpecialitieDto: CreateSpecialitieDto) {
    return this.specialtyService.create(createSpecialitieDto);
  }

  @Get()
  async findAll() {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const specialty = await this.specialtyService.findOne(+id);
    if (!specialty) throw new NotFoundException(`Specialty #${id} not found`);
    return specialty;
  }

  @Get('code/:specialty_code')
  async findByCode(@Param('specialty_code') specialty_code: string) {
    const specialty = await this.specialtyService.findByCode(specialty_code);
    if (!specialty) throw new NotFoundException(`Specialty with code ${specialty_code} not found`);
    return specialty;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSpecialitieDto: UpdateSpecialitieDto) {
    const updated = await this.specialtyService.update(+id, updateSpecialitieDto);
    if (!updated) throw new NotFoundException(`Specialty #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.specialtyService.remove(+id);
    if (!deleted) throw new NotFoundException(`Specialty #${id} not found`);
    return { deleted: true };
  }
}
