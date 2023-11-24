import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService : UserService
  ) {}

  async createU(c: CreateUserDto) {
    return await this.userService.createU(c)
  }

  async loginU(l: LoginUserDto) {
    try{const user = await this.userService.findOnByEmail(l.email)
      const ispwmatched = await user.checkPassword(l.password)
      if (!ispwmatched) throw new HttpException('password do not match', HttpStatus.BAD_REQUEST);
      return ispwmatched
  } catch(e) {
    console.log(e)
    throw new HttpException('not found', HttpStatus.INTERNAL_SERVER_ERROR)
  }


}

}
