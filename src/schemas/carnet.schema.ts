import * as mongoose from 'mongoose';
import { schemaOptions } from '../utils/index';

const CarnetSchema = new mongoose.Schema(
  {
    name: String,
    carnet: String,
    address: String,
    municipio: String,
    provincia: String,
    phoneNumber: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: Boolean, default: true, index: true },
  },
  { ...schemaOptions },
);

export default CarnetSchema;
