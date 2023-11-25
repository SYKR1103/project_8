import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './RequestwithUser';

@Controller('auth')
@ApiTags('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async createU(@Body() c:CreateUserDto) {
    return await this.authService.createU(c);
  }

  
  @UseGuards(LocalAuthGuard) //PASSPORT를 활용하겠다.
  @Post("/login")  async loginU(@Req() req:RequestWithUser) {

    
  //local auth를 하고나면 user의 정보가 나간다
    const { user } = req;
    //const user =  await this.authService.loginU(l); ㅣlocalauthguard에 이미 추가된 부분
    const token = await this.authService.generateJwtAccessToken(user.id)
    return {user, token}
  }

}
