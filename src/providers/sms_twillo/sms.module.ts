import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
