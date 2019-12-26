import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Product } from './product.model';
import { ShoppingService } from '../../shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public loadedProducts = [];
  private refreshSub: Subscription;
  private getDataSub: Subscription;

  constructor(private dataService: DataService, private shoppingService: ShoppingService) {
    this.refreshSub = this.shoppingService.refreshProducts.subscribe(() => {
      console.log("getallproducts");
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.getAllProducts();
  }
  ngOnDestroy(): void {
    this.refreshSub.unsubscribe();
    this.getDataSub.unsubscribe();
  }
  private getAllProducts() {
    this.getDataSub = this.dataService.fetchProducts()
      .subscribe((data) => this.loadedProducts = data);
  }

  clickEditProduct(editProduct: Product) {
    console.log(editProduct);
    this.shoppingService.statuseEditProduct.next(editProduct);
  }
}

