import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class VerifyUserDTO {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  otp: string;
}
