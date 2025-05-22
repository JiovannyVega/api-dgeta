import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupSubjectDto } from './create-group-subject.dto';

export class UpdateGroupSubjectDto extends PartialType(CreateGroupSubjectDto) { }
