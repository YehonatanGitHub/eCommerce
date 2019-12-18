import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  loadedProducts: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchProducts();
  }
  private fetchProducts() {
    this.http.get('http://localhost:3000/admin/products')
      .subscribe(products => {
        this.loadedProducts = products;
        console.log(products);
      });
  }
}

