import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SpecialitieService } from './specialitie.service';
import { CreateSpecialitieDto } from './dto/create-specialitie.dto';
import { UpdateSpecialitieDto } from './dto/update-specialitie.dto';

@Controller('specialitie')
export class SpecialitieController {
  constructor(private readonly specialitieService: SpecialitieService) { }

  @Post()
  async create(@Body() createSpecialitieDto: CreateSpecialitieDto) {
    return this.specialitieService.create(createSpecialitieDto);
  }

  @Get()
  async findAll() {
    return this.specialitieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const specialitie = await this.specialitieService.findOne(+id);
    if (!specialitie) throw new NotFoundException(`Specialitie #${id} not found`);
    return specialitie;
  }

  @Get('code/:specialty_code')
  async findByCode(@Param('specialty_code') specialty_code: string) {
    const specialitie = await this.specialitieService.findByCode(specialty_code);
    if (!specialitie) throw new NotFoundException(`Specialitie with code ${specialty_code} not found`);
    return specialitie;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSpecialitieDto: UpdateSpecialitieDto) {
    const updated = await this.specialitieService.update(+id, updateSpecialitieDto);
    if (!updated) throw new NotFoundException(`Specialitie #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.specialitieService.remove(+id);
    if (!deleted) throw new NotFoundException(`Specialitie #${id} not found`);
    return { deleted: true };
  }
}
