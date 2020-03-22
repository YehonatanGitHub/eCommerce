import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Product } from './product.model';
import { ShoppingService } from '../../shopping.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public loadedProducts = [];
  private refreshSub: Subscription;
  private getDataSub: Subscription;

  constructor(public dataService: DataService, public authService: AuthService, private shoppingService: ShoppingService, private _router: Router) {
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
      .subscribe(
        res => this.loadedProducts = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/'])
            } else if (err.status >= 500) {
              this._router.navigate(['/'])
            }
          }
        });
  }

  clickEditProduct(editProduct: Product) {
    console.log(editProduct);
    this.shoppingService.statuseEditProduct.next(editProduct);
  }
  clickAddProduct(addProduct: Product) {
    console.log(addProduct);
    console.log('this to add');
    this.shoppingService.statuseAddProduct.next(addProduct);




  }
}

