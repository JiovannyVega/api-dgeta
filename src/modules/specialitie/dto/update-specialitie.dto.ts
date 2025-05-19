import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialitieDto } from './create-specialitie.dto';

export class UpdateSpecialitieDto extends PartialType(CreateSpecialitieDto) {}
