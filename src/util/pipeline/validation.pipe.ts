import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class ValidatorPipe implements PipeTransform {
  constructor(private schema: Joi.Schema) {}
  transform(value: Record<string, any>) {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message);
      throw new BadRequestException(errorMessages);
    }
    return result.value;
  }
}
