import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('state')
export class StateController {
    constructor(private readonly stateService: StateService) { }

    @Post()
    async create(@Body() createStateDto: CreateStateDto) {
        return this.stateService.create(createStateDto);
    }

    @Get()
    async findAll() {
        return this.stateService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.stateService.findOne(+id);
    }

    @Get('code/:code')
    async findByCode(@Param('code') code: string) {
        const state = await this.stateService.findByCode(code);
        if (!state) {
            throw new NotFoundException(`State with code ${code} not found`);
        }
        return state;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
        return this.stateService.update(+id, updateStateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.stateService.remove(+id);
        return { deleted: true };
    }
}
