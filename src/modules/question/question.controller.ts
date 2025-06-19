import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }

    @Get()
    async findAll(@Query('questionnaire') questionnaireId?: string) {
        if (questionnaireId) {
            return this.questionService.findByQuestionnaireId(+questionnaireId);
        }
        return this.questionService.findAll();
    }

    @Get('risk')
    async findRiskQuestions(@Query('questionnaire') questionnaireId?: string) {
        const questionnaireIdNum = questionnaireId ? +questionnaireId : undefined;
        return this.questionService.findRiskQuestions(questionnaireIdNum);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.questionService.findOne(+id);
    }

    @Get('questionnaire/:questionnaireId')
    async findByQuestionnaireId(@Param('questionnaireId') questionnaireId: string) {
        return this.questionService.findByQuestionnaireId(+questionnaireId);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
        return this.questionService.update(+id, updateQuestionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.questionService.remove(+id);
        return { deleted: true };
    }
}
