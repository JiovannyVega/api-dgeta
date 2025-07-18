import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) { }

    @Post()
    async create(@Body() createAnswerDto: CreateAnswerDto) {
        return this.answerService.create(createAnswerDto);
    }

    @Get()
    async findAll() {
        return this.answerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.answerService.findOne(+id);
    }

    @Get('question/:questionId')
    async findByQuestionId(@Param('questionId') questionId: string) {
        return this.answerService.findByQuestionId(+questionId);
    }

    @Get('student/:studentId')
    async findByStudentId(@Param('studentId') studentId: string) {
        return this.answerService.findByStudentId(+studentId);
    }

    @Get('student/:studentId/questionnaire/:questionnaireId')
    async findByStudentAndQuestionnaire(
        @Param('studentId') studentId: string,
        @Param('questionnaireId') questionnaireId: string
    ) {
        return this.answerService.findByStudentAndQuestionnaire(+studentId, +questionnaireId);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
        return this.answerService.update(+id, updateAnswerDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.answerService.remove(+id);
        return { deleted: true };
    }
}
