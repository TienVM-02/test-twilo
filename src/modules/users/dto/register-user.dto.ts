import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class RegisterUser {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phone: string;
}
