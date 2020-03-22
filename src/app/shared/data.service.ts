import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shopping/products/product/product.model';
// import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({ providedIn: 'root' })
export class DataService {

    public loadedCart: any = [];

    private _ProductsUrl = environment.apiUrl + '/admin/products';
    private _CityNames = 'https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json';
    private _editProduct = environment.apiUrl + '/admin/edit-product';
    private _addProduct = environment.apiUrl + '/admin/add-product';
    private _addProductToCart = environment.apiUrl + '/shop/addtocart';
    private _getCart = environment.apiUrl + '/shop/cart';
    private _delFromCart = environment.apiUrl + '/shop/delfromcart';
    private _delAllFromCart = environment.apiUrl + '/shop/delallfromcart';
    private _placeOrder = environment.apiUrl + '/shop/order';
    private _getOrders = environment.apiUrl + '/shop/getOrders';
    private _getProducts = environment.apiUrl + '/shop/getproducts';
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