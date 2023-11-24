import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')

export class UserController {
  constructor(private readonly userService: UserService) {}

// 어차피 user.service에서 만든걸로 auth에서 땡겨서 할거라 여긴 일단 공란




}
