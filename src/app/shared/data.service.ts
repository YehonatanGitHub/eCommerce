import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shopping/products/product/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
    private loadedProducts: Product[] = [];

    constructor(private http: HttpClient) { }

    fetchProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('http://localhost:3000/admin/products');
        // .subscribe(products => {
        //     this.loadedProducts = products;
        //     console.log(products);


    }


}