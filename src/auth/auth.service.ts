import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './tokenPayload.interface';
import { config } from 'process';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService : UserService,
    private readonly configService : ConfigService,
    private readonly jwtService : JwtService
  ) {}

  async createU(c: CreateUserDto) {
    return await this.userService.createU(c)
  }

  async loginU(l: LoginUserDto) {
    try{const user = await this.userService.findOnByEmail(l.email)
      const ispwmatched = await user.checkPassword(l.password)
      if (!ispwmatched) throw new HttpException('password do not match', HttpStatus.BAD_REQUEST);
      return user
  } catch(e) {
    console.log(e)
    throw new HttpException('not found', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

  public generateJwtAccessToken(userId:string) {

    const payload : TokenPayloadInterface = {userId}
    const token = this.jwtService.sign(payload, {

      secret : this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,  
    })

    return token

  }




}
