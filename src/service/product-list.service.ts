import { ProductWithImage } from './../models/product';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "../models/product";
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ProductListService {
    private productListRefWithImages = this.db.list<ProductWithImage>('productos');
    private productListRef = this.db.list<Product>('productos');

    constructor(private db: AngularFireDatabase) {}

    getProductList() {
        return this.productListRefWithImages;
    }

    addProduct(prod: Product) {
        return this.productListRef.push(prod);
    }

    updateProduct(prod: Product) {
        return this.productListRef.update(prod.key,prod);
    }

    removeProduct(prod:Product) {
        return this.productListRef.remove(prod.key);
    }
}