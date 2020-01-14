import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shopping/products/product/product.model';
// import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

    private _ProductsUrl = 'http://localhost:3000/admin/products';
    private _CityNames = 'https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json';
    private _editProduct = 'http://localhost:3000/admin/edit-product';
    private _addProduct = 'http://localhost:3000/admin/add-product';

    constructor(private http: HttpClient) { }

    fetchProducts() {
        return this.http.get<Product[]>(this._ProductsUrl)
    }
    fetchCityNames() {
        return this.http.get<any>(this._CityNames)
    }
    editProduct(data) {
        return this.http.post<any>(this._editProduct, data)
    }
    addProduct(data) {
        return this.http.post<any>(this._addProduct, data)
    }


}