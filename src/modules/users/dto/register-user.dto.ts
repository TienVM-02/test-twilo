import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class RegisterUser {
  @ApiProperty()
  fullName: string;

  @ApiProperty({ nullable: true })
  phone: string;

  @ApiProperty({ nullable: true })
  email: string;
}
