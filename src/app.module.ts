import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLModule } from './providers/mysql-module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import * as Joi from '@hapi/joi';
import { SmsModule } from './providers/sms_twillo/sms.module';
import { EmailModule } from './providers/email_twilio/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
      }),
    }),
    MySQLModule,
    UserModule,
    SmsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
