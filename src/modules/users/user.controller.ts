import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUser } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(@Body() dto: RegisterUser): Promise<string> {
    return await this.userService.registerUser(dto);
  }
  // @Post('/initial-verification')
  // async initialPhoneNumberVerification(@Body() req: RegisterUser) {
  //   await this.userService.initialPhoneNumberVerification(req.phone);
  // }
}
