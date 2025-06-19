import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';

@Controller('municipality')
export class MunicipalityController {
    constructor(private readonly municipalityService: MunicipalityService) { }

    @Post()
    async create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
        return this.municipalityService.create(createMunicipalityDto);
    }

    @Get()
    async findAll() {
        return this.municipalityService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.municipalityService.findOne(+id);
    }

    @Get('state/:stateId')
    async findByStateId(@Param('stateId') stateId: string) {
        return this.municipalityService.findByStateId(+stateId);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateMunicipalityDto: UpdateMunicipalityDto) {
        return this.municipalityService.update(+id, updateMunicipalityDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.municipalityService.remove(+id);
        return { deleted: true };
    }
}
