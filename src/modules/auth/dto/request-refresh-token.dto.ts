import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestRefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  refreshToken: string;
}
