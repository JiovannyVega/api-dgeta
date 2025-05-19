import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PersonalInformationService } from './personal-information.service';
import { CreatePersonalInformationDto } from './dto/create-personal-information.dto';
import { UpdatePersonalInformationDto } from './dto/update-personal-information.dto';

@Controller('personal-information')
export class PersonalInformationController {
  constructor(private readonly personalInformationService: PersonalInformationService) { }

  @Post()
  create(@Body() createPersonalInformationDto: CreatePersonalInformationDto) {
    return this.personalInformationService.create(createPersonalInformationDto);
  }

  @Get()
  findAll() {
    return this.personalInformationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.personalInformationService.findOne(+id);
  }

  @Get('user/:user_id')
  async findByUserId(@Param('user_id') user_id: string) {
    return this.personalInformationService.findByUserId(+user_id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePersonalInformationDto: UpdatePersonalInformationDto) {
    const updated = await this.personalInformationService.update(+id, updatePersonalInformationDto);
    if (!updated) throw new NotFoundException(`PersonalInformation #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.personalInformationService.remove(+id);
    if (!deleted) throw new NotFoundException(`PersonalInformation #${id} not found`);
    return { deleted: true };
  }
}
