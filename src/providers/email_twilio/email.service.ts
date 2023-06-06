import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { ConfirmReq } from './request/dto.req';
import { UserService } from 'src/modules/users/user.service';

@Injectable()
export class EmailService {
  private twilioClient: Twilio;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const accountSid = configService.get(process.env.TWILIO_ACCOUNT_SID);
    const authToken = configService.get(process.env.TWILIO_AUTH_TOKEN);

    this.twilioClient = new Twilio(accountSid, authToken);
  }
  async sendVerifyCodeByEmail(receiver: string) {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    const emailTemplate = process.env.INITIAL_EMAIL_TEMPLATE_ID;
    const sender_email = process.env.SENDER_EMAIL;
    const sender_name = process.env.SENDER_NAME;

    return this.twilioClient.verify.v2
      .services(serviceSid)
      .verifications.create({
        channelConfiguration: {
          template_id: emailTemplate,
          from: sender_email,
          from_name: sender_name,
        },
        to: receiver,
        channel: 'email',
      });
  }

  async confirmEmail(dto: ConfirmReq): Promise<string> {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    const result = await this.twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: dto.email, code: dto.code });
    if (!result.valid || result.status !== 'approved') {
      throw new HttpException('OTP fail', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.confirmUser(dto.email);
  }
}
