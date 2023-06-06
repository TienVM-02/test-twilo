import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SmsService } from './sms.service';
import { RegisterUser } from 'src/modules/users/dto/register-user.dto';
import { VerifyUserDTO } from 'src/modules/users/dto/verify-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('sms')
@ApiTags('sms')
@UseInterceptors(ClassSerializerInterceptor)
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
  @Post('/initial-verification')
  async initialPhoneNumberVerification(@Query() req: RegisterUser) {
    await this.smsService.initialPhoneNumberVerification(req.phone);
  }

  @Post('/confirm-user')
  async confirmUser(@Body() dto: VerifyUserDTO) {
    await this.smsService.confirmPhoneNumber(dto.phone, dto.otp);
  }
}
