import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { HttpException, HttpStatus} from '@nestjs/common';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {


  @InjectRepository(User)
  private userRepo : Repository<User>

  async createU(createUserDto: CreateUserDto) {
    const newuser = await this.userRepo.create(createUserDto)
    await this.userRepo.save(newuser)
    return newuser;
  }

  async findOnById(id: string) {
    
    const founduser = await this.userRepo.findOneBy({id})
    if (founduser) return founduser
    throw new HttpException("xxx", HttpStatus.NOT_FOUND)
  }

  async findOnByEmail(email: string) {
    
    const founduser = await this.userRepo.findOneBy({email})
    if (founduser) return founduser
    throw new HttpException("xxx", HttpStatus.NOT_FOUND)
  }

}
