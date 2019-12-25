import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Product } from './product.model';
import { ShoppingService } from '../../shopping.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public loadedProducts = [];

  constructor(private dataService: DataService, private shoppingService: ShoppingService) { }


  ngOnInit() {
    this.shoppingService.refreshProducts.subscribe((is: Boolean) => {
      console.log(is);
      this.getAllProducts();
    });
    this.getAllProducts();

  }

  private getAllProducts() {
    this.dataService.fetchProducts()
      .subscribe((data) => this.loadedProducts = data);
  }

  clickEditProduct(editProduct: Product) {
    console.log(editProduct);
    this.shoppingService.statuseEditProduct.next(editProduct);
  }
}

