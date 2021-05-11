import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  public transform(incomeValues: any, metadata: ArgumentMetadata) {}
}
