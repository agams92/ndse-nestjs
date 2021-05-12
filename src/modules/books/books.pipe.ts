import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import * as Joi from 'joi';

export const bookCreateSchema = Joi.object().keys({
  title: Joi.string().min(0).max(30).required(),
  description: Joi.string().min(0).max(400),
  authors: Joi.string().min(0).max(100),
  favourite: Joi.string().min(0).max(30),
  fileCover: Joi.string().min(0).max(30),
  fileName: Joi.string().min(0).max(30),
  fileBook: Joi.string().min(0).max(30),
});

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  public transform(incomeValues: any) {
    const { error } = this.schema.validate(incomeValues);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return incomeValues;
  }
}
