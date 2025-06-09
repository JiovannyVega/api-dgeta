import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { QuestionnaireResultService } from './questionnaire-result.service';
import { CreateQuestionnaireResultDto } from './dto/create-questionnaire-result.dto';
import { UpdateQuestionnaireResultDto } from './dto/update-questionnaire-result.dto';

@Controller('questionnaire-result')
export class QuestionnaireResultController {
  constructor(private readonly questionnaireResultService: QuestionnaireResultService) { }

  @Post()
  async create(@Body() createQuestionnaireResultDto: CreateQuestionnaireResultDto) {
    return this.questionnaireResultService.create(createQuestionnaireResultDto);
  }

  @Get()
  async findAll() {
    return this.questionnaireResultService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.questionnaireResultService.findOne(+id);
    if (!result) throw new NotFoundException(`QuestionnaireResult #${id} not found`);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuestionnaireResultDto: UpdateQuestionnaireResultDto) {
    const updated = await this.questionnaireResultService.update(+id, updateQuestionnaireResultDto);
    if (!updated) throw new NotFoundException(`QuestionnaireResult #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.questionnaireResultService.remove(+id);
    if (!deleted) throw new NotFoundException(`QuestionnaireResult #${id} not found`);
    return { deleted: true };
  }
}
