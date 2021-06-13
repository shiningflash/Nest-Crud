import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Query
} from "@nestjs/common";

import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,
    ) {
        const product = await this.productsService.insertProduct(
            prodTitle, prodDescription, prodPrice
        );
        return product;
    }

    @Get()
    async getAllProducts(
        @Query('min_price') minPrice: number,
        @Query('max_price') maxPrice: number
    ) {
        const products = await this.productsService.getAllProducts(minPrice, maxPrice);
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        const product = await this.productsService.getSingleProduct(prodId);
        return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return { success: true, message: 'Updated successfully' }
    }

    @Delete(':id')
    async removeProduct(
        @Param('id') prodId: string
    ) {
        await this.productsService.deleteProduct(prodId);
        return { success: true, message: 'Deleted successfully' }
    }
}

