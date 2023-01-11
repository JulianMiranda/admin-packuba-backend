import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { MongoQuery } from 'src/dto/mongo-query.dto';
export declare class TransformQuery implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata): Promise<MongoQuery>;
    transformQuery(value: any): MongoQuery;
    transformProjection(fields: any): any;
    transformSort(sort: any): {};
    transformFilter(filters: any, search: any): {};
    transformPopulation(population: any): any[];
    getMongoQuery(operator: any, value: any): any;
}
