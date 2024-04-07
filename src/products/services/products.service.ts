import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

type ProductData = {
  name: string;
  description: string;
  price: number;
  code: string;
  status: string;
  image: string;
  id?: number;
};

type UpdateProductData = {
  description: string;
  price: number;
};

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(data: ProductData): Promise<Product> {
    const existentProduct = await this.productsRepository.findOne({
      where: { code: data.code },
    });

    if (existentProduct) {
      throw new Error('Product already exists');
    }

    return await this.productsRepository.save(data);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productsRepository.find({
      order: { name: 'ASC' },
      where: { status: 'ACTIVE' },
    });

    if (products.length === 0) {
      throw new Error('Products not found');
    }

    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneOrFail({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(id: number, requestData: UpdateProductData): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found to update');
    }

    product.description = requestData.description;
    product.price = requestData.price;
    return await this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found to remove');
    }

    await this.productsRepository.remove(product);
  }
}
