import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  email: string;
}
