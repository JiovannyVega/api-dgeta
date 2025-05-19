import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalInformationDto } from './create-personal-information.dto';

export class UpdatePersonalInformationDto extends PartialType(CreatePersonalInformationDto) { }
