import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ToIntegerPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): number;
}
