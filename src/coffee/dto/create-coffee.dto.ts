import { IsArray, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  name: string;

  @IsArray()
  flavors: string[];
}
