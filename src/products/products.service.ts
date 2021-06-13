import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model'

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({
            title, description, price
        });
        console.log(title, description, price);
        const product = await newProduct.save();
        return this.formatProduct(product);
    }

    async getAllProducts(minPrice: number, maxPrice: number) {
        const product_list = await this.productModel.find().exec();
        // if (minPrice) {
        //     products = products.filter(product => product.price >= minPrice);
        // }
        // if (maxPrice) {
        //     products = products.filter(product => product.price <= maxPrice)
        // }
        return product_list.map(product => (this.formatProduct(product)));
    }

    async getSingleProduct(prodId: string) {
        const product = await this.findProduct(prodId);
        return this.formatProduct(product);
    }

    async updateProduct(
        productId: string,
        title: string,
        description: string,
        price: number
    ) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if (result.n == 0) {
            throw new NotFoundException('Could not find product!')
        }
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id);
        } catch (eroor) {
            throw new NotFoundException('Could not find product!');
        }
        if (!product) {
            throw new NotFoundException('Could not find product!');
        }
        return product;
    }

    private formatProduct(product: Product) {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }
}