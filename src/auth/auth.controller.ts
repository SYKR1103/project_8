import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async createU(@Body() c:CreateUserDto) {
    return await this.authService.createU(c);
  }

  @Post("/login")
  async loginU(@Body() l:LoginUserDto) {
    const user =  await this.authService.loginU(l);
    const token = await this.authService.generateJwtAccessToken(user.id)
    return token
  }

}
