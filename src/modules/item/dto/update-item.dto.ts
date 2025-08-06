import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  price: number;
}
