import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export class Carnet extends Document {
  @IsString()
  name: string;

  @IsString()
  carnet: string;

  @IsString()
  address: string;

  @IsString()
  municipio: string;

  @IsString()
  provincia: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  user: string;
}
