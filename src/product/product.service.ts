import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository} from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {Repository} from 'typeorm';
import { HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepo : Repository<Product>
  ) {}



  async createP(createProductDto: CreateProductDto) {
    const newproduct = await this.productRepo.create(createProductDto)
    await this.productRepo.save(newproduct)
    return newproduct
  }

  async findallP() {
    return this.productRepo.find()
  }


  async findOneP(id: string) {
    const item = this.productRepo.findOneBy({id})
    if (item) return item
    throw new HttpException("xxxx", HttpStatus.NOT_FOUND)
  }

  async updateP(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto)
    const item = await this.productRepo.findOneBy({id})
    if (item) return item
    throw new HttpException("xxxx", HttpStatus.NOT_FOUND)
  }

  async deleteP(id: string) {
    const deleteproduct = await this.productRepo.delete(id)
    if (!deleteproduct.affected) throw new HttpException("not found", HttpStatus.NOT_FOUND
    )
    return "deleted"
  }
}
