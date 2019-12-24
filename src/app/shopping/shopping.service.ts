import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../shopping/products/product/product.model';
import { Subject } from 'rxjs'
@Injectable()
export class ShoppingService {

    statuseEditProduct = new Subject<Product>();

    constructor() { }

} 