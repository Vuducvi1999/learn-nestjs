import { IsNotEmpty, IsString } from 'class-validator';

export class RequestRefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
