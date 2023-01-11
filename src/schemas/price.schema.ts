import * as mongoose from 'mongoose';
import { schemaOptions } from '../utils/index';

export const PriceSchema = new mongoose.Schema(
  {
    mlc: { type: Number, default: 125 },
    mn: { type: Number, default: 100 },
    rate: { type: Number, default: 100 },
    oneandhalfkgPrice: { type: Number, default: 21 },
    twokgPrice: { type: Number, default: 25 },
    threekgPrice: { type: Number, default: 30 },
    fourkgPrice: { type: Number, default: 37 },
    fivekgPrice: { type: Number, default: 46 },
    sixkgPrice: { type: Number, default: 52 },
    sevenkgPrice: { type: Number, default: 58 },
    eightkgPrice: { type: Number, default: 61 },
    eigthkgPrice: { type: Number, default: 61 },
    ninekgPrice: { type: Number, default: 70 },
    tenkgPrice: { type: Number, default: 80 },
    elevenkgPrice: { type: Number, default: 88 },
    twelvekgPrice: { type: Number, default: 96 },
    thirteenkgPrice: { type: Number, default: 104 },
    fourteenkgPrice: { type: Number, default: 112 },
    fifteenkgPrice: { type: Number, default: 120 },
    sixteenkgPrice: { type: Number, default: 129 },
    seventeenkgPrice: { type: Number, default: 139 },
    eighteenkgPrice: { type: Number, default: 150 },
    nineteenkgPrice: { type: Number, default: 161 },
    twentykgPrice: { type: Number, default: 175 },
  },
  { ...schemaOptions },
);
