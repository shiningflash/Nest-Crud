import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from './product.model'

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const id = "PRD" + (Math.random() * 100000000).toString();
        const newProduct = new Product(id, title, description, price);
        console.log(title, description, price)
        this.products.push(newProduct);
        return newProduct;
    }

    getAllProducts(minPrice: number, maxPrice: number) {
        var products = this.products;
        if (minPrice) {
            products = products.filter(product => product.price >= minPrice);
        }
        if (maxPrice) {
            products = products.filter(product => product.price <= maxPrice)
        }
        return [...products];
    }

    getSingleProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];
        return { ...product };
    }

    updateProduct(
        productId: string,
        title: string,
        description: string,
        price: number
    ) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};

        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1); // start from index, then remove 1 element 
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(product => product.id == id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not found product!');
        }
        return [product, productIndex];
    }
}