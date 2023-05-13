import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { BaseService } from '../base/base.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUser } from './dto/register-user.dto';
import { VerifyUserDTO } from './dto/verify-user.dto';
import { UserEnum } from 'src/comon/enums/user-enum.enum';

@Injectable()
export class UserService extends BaseService<User> {
  private twilloClient: Twilio;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // private readonly configService: ConfigService,
  ) {
    super(userRepository);
    // const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    // const authToken = configService.get('TWILIO_AUTH_TOKEN');

    // this.twilloClient = new Twilio(accountSid, authToken);
  }

  async registerUser(dto: RegisterUser): Promise<string> {
    let otp = '';
    let counter = 0;
    while (counter < 6) {
      otp += '0123456789'.charAt(Math.floor(Math.random() * 10));
      counter += 1;
    }

    const newUser = await this.userRepository.save({
      fullName: dto.fullName,
      phone: dto.phone,
      otp: otp,
    });
    return 'newUser';
  }

  async verify(dto: VerifyUserDTO): Promise<string> {
    const userFind = await this.userRepository.findOne({
      where: { phone: dto.phone },
    });
    if (!userFind)
      throw new HttpException(
        `The phone ${dto.phone} not existed`,
        HttpStatus.NOT_FOUND,
      );
    return 'verify';
  }

  async confirmUser(phone: string) {
    const userFind = await this.userRepository.findOne({
      where: { phone: phone },
    });
    if (!userFind)
      throw new HttpException(
        `The phone ${phone} not existed`,
        HttpStatus.NOT_FOUND,
      );
    userFind.status = UserEnum.ACTIVE;
    await this.userRepository.save(userFind);
    return 'confirm';
  }

  // initialPhoneNumberVerification(phoneNumber: string) {
  //   const serviceSid = this.configService.get(
  //     'TWILIO_VERIFICATION_SERVICE_SID',
  //   );
  //   return this.twilloClient.verify.v2
  //     .services(serviceSid)
  //     .verifications.create({ to: phoneNumber, channel: 'sms' });
  // }
}
