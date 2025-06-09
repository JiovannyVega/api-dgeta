import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionnaireResultDto } from './create-questionnaire-result.dto';

export class UpdateQuestionnaireResultDto extends PartialType(CreateQuestionnaireResultDto) { }
