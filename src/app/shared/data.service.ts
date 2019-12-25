import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shopping/products/product/product.model';
// import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

    constructor(private http: HttpClient) { }

    fetchProducts() {
        return this.http.get<Product[]>('http://localhost:3000/admin/products')

    }
}