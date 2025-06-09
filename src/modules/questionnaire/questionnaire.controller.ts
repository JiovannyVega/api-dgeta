import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) { }

  @Post()
  async create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Get()
  async findAll() {
    return this.questionnaireService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const questionnaire = await this.questionnaireService.findOne(+id);
    if (!questionnaire) throw new NotFoundException(`Questionnaire #${id} not found`);
    return questionnaire;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuestionnaireDto: UpdateQuestionnaireDto) {
    const updated = await this.questionnaireService.update(+id, updateQuestionnaireDto);
    if (!updated) throw new NotFoundException(`Questionnaire #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.questionnaireService.remove(+id);
    if (!deleted) throw new NotFoundException(`Questionnaire #${id} not found`);
    return { deleted: true };
  }
}
