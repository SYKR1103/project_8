import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createP(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createP(createProductDto);
  }

  @Get("all")
  async findAllP() {
    return await this.productService.findallP();
  }

  @Get(':id')
  async findOneP(@Param('id') id: string) {
    return await this.productService.findOneP(id);
  }

  @Patch(':id')
  async updateP(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.updateP(id, updateProductDto);
  }

  @Delete(':id')
  async deleteP(@Param('id') id: string) {
    return await this.productService.deleteP(id);
  }
}
