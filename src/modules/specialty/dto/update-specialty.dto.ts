import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialitieDto } from './create-specialty.dto';

export class UpdateSpecialitieDto extends PartialType(CreateSpecialitieDto) { }
