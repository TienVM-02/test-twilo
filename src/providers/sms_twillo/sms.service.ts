import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/users/user.service';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilloClient: Twilio;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const accountSid = configService.get(process.env.TWILIO_ACCOUNT_SID);
    const authToken = configService.get(process.env.TWILIO_AUTH_TOKEN);

    this.twilloClient = new Twilio(accountSid, authToken);
  }

  initialPhoneNumberVerification(phoneNumber: string) {
    // const serviceSid = this.configService.get(
    //   process.env.TWILIO_VERIFICATION_SERVICE_SID,
    // );
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    return this.twilloClient.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
  }

  async confirmPhoneNumber(phoneNumber: string, otp: string) {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    const result = await this.twilloClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: otp });
    if (!result.valid || result.status !== 'approved') {
      throw new HttpException('OTP fail', HttpStatus.BAD_REQUEST);
    }
    await this.userService.confirmUser(phoneNumber);
  }
}
