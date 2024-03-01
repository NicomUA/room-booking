import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('Date should be provided');
    }

    if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(value)) {
      throw new BadRequestException(
        'Invalid date format. Expected YYYY-MM-DD HH:MM',
      );
    }

    return new Date(value);
  }
}
