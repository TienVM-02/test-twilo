import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';
import { ConfirmReq, EmailReq } from './request/dto.req';

@Controller('email')
@ApiTags('email')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('/initial-verify-email')
  async initialEmailVerification(@Query() dto: EmailReq) {
    await this.emailService.sendVerifyCodeByEmail(dto.email);
  }

  @Post('/confirm-email')
  async confirmEmail(@Query() dto: ConfirmReq): Promise<string> {
    return await this.emailService.confirmEmail(dto);
  }
}
