import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/product.create.dto';
import { UpdateProductDto } from '../dto/product.update.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async create(@Body() requestData: CreateProductDto) {
    try {
      return await this.productsService.create({
        name: requestData.name,
        description: requestData.description,
        price: requestData.price,
        code: requestData.code,
        status: requestData.status,
        image: requestData.image,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      return await this.productsService.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() requestData: UpdateProductDto) {
    try {
      return await this.productsService.update(id, requestData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    try {
      return await this.productsService.remove(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
