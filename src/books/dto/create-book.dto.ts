import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateBookDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}

export const CreateBookSchema = Joi.object({
  name: Joi.string().label('name').trim().required(),
  price: Joi.number().label('price').required(),
}).options({
  abortEarly: false,
});
