import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class AcceptedProps implements PipeTransform<any> {
    route: string;
    constructor(route: string);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
