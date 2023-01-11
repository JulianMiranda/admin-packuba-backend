import { Price } from 'src/dto/price.dto';
import { PriceRepository } from './price.repository';
export declare class PriceController {
    private priceRepository;
    constructor(priceRepository: PriceRepository);
    getPrices(): any;
    getPricesUnAuth(): any;
    update(data: Partial<Price>): Promise<boolean>;
}
