import { ApiProperty } from '@nestjs/swagger';

export class EmailReq {
  @ApiProperty()
  email: string;
}

export class ConfirmReq {
  @ApiProperty()
  email: string;

  @ApiProperty()
  code: string;
}
