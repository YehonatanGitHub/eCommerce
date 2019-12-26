import { Injectable } from '@angular/core';
import { Product } from '../shopping/products/product/product.model';
import { Subject } from 'rxjs'
@Injectable()
export class ShoppingService {

    statuseEditProduct = new Subject<Product>();
    refreshProducts = new Subject<void>();

    constructor() { }

} 