import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shopping/products/product/product.model';
// import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

    public loadedCart: any = [];

    private _ProductsUrl = 'http://localhost:3000/admin/products';
    private _CityNames = 'https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json';
    private _editProduct = 'http://localhost:3000/admin/edit-product';
    private _addProduct = 'http://localhost:3000/admin/add-product';
    private _addProductToCart = 'http://localhost:3000/shop/addtocart';
    private _getCart = 'http://localhost:3000/shop/cart';
    private _delFromCart = 'http://localhost:3000/shop/delfromcart';
    private _delAllFromCart = 'http://localhost:3000/shop/delallfromcart';
    private _placeOrder = 'http://localhost:3000/shop/order';
    private _getOrders = 'http://localhost:3000/shop/getOrders';
    private _getProducts = 'http://localhost:3000/shop/getproducts';
    constructor(private http: HttpClient) { }

    fetchProducts() {
        return this.http.get<Product[]>(this._ProductsUrl)
    }
    fetchCityNames() {
        return this.http.get<any>(this._CityNames)
    }
    getOrders() {
        return this.http.get<any>(this._getOrders)
    }
    getProducts() {
        return this.http.get<any>(this._getProducts)
    }
    editProduct(data) {
        return this.http.post<any>(this._editProduct, data)
    }
    addProduct(data) {
        return this.http.post<any>(this._addProduct, data)
    }
    addProductToCart(data) {
        return this.http.post<any>(this._addProductToCart, data)
    }
    getCart(data) {
        return this.http.post<any>(this._getCart, data)
    }
    delFromCart(data) {
        return this.http.post<any>(this._delFromCart, data)
    }
    delAllFromCart(data) {
        return this.http.post<any>(this._delAllFromCart, data)
    }
    placeOrder(data) {
        return this.http.post<any>(this._placeOrder, data)
    }

}