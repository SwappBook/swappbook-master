import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "../models/product";

@Injectable()
export class ProductListService {
    private productListRef = this.db.list<Product>('productos');

    constructor(private db: AngularFireDatabase) {}

    getProductList() {
        return this.productListRef;
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