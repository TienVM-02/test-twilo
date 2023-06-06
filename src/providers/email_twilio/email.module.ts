import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/users/user.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
