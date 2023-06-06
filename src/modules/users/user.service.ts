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
    const newUser = await this.userRepository.save({
      fullName: dto.fullName,
      phone: dto.phone,
      email: dto.email,
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

  async confirmUser(phoneOrEmail: string) {
    const userFind = await this.userRepository
      .createQueryBuilder('users')
      .where('phone = :phone', { phone: phoneOrEmail })
      .orWhere('email = :email', { email: phoneOrEmail })
      .getOne();

    if (!userFind)
      throw new HttpException(
        `The user ${phoneOrEmail} not existed`,
        HttpStatus.NOT_FOUND,
      );
    console.log(userFind);
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
