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

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,
    ): any {
        const product = this.productsService.insertProduct(
            prodTitle, prodDescription, prodPrice
        );
        return product;
    }

    @Get()
    getAllProducts(
        @Query('min_price') minPrice: number,
        @Query('max_price') maxPrice: number
    ) {
        return this.productsService.getAllProducts(minPrice, maxPrice);  
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return { success: true, message: 'Updated successfully' }
    }

    @Delete(':id')
    removeProduct(
        @Param('id') prodId: string 
    ) {
        this.productsService.deleteProduct(prodId);
        return { success: true, message: 'Deleted successfully' }
    }
}

