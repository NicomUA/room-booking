import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('Date should be provided');
    }
    // ISO Date regular expression check
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(value)) {
      throw new BadRequestException(
        'Invalid date format. Expected YYYY-MM-DDTHH:MM:SS.MMMZ',
      );
    }

    return new Date(value);
  }
}
