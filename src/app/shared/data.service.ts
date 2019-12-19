import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { postData } from '../shopping/sidebar/admin/admin.component';
@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(private http: HttpClient) {
    }

    // storeNewProduct(product: postData[]) {

    // }
}