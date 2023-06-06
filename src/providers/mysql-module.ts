import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin@123',
      database: 'test_twilo',
      entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: false,
      legacySpatialSupport: false,
    }),
  ],
})
export class MySQLModule {}
