import { Component, OnInit, ViewChild, SimpleChanges } from "@angular/core";
// import { NgForm } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Product } from '../../products/product/product.model'
import { ShoppingService } from '../../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  activatedSub2: Subscription;
  addProduct: Product = null;
  showModal: Boolean = false;
  total: Number;
  number: any;
  private getCartDataSub: Subscription;
  cartId: any = this.authService.decodedToken.cartId;
  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 100);
    });
  }
  constructor(private http: HttpClient, private shoppingService: ShoppingService, private authService: AuthService, private dataService: DataService, private _router: Router) {
    this.activatedSub2 = this.shoppingService.statuseAddProduct.subscribe(
      (addProduct: Product) => {
        this.addProduct = addProduct;
        console.log(this.addProduct);
        this.waitForOneSecond().then(() => {
          console.log('addProduct');
          this.showModal = true;
        }
        );
      }
    );
  }

  ngOnInit() {
    this.cartId = this.authService.decodedToken.cartId;
    this.goGetCart()
  }


  // ngOnDestroy(): void {
  //   this.getCartDataSub.unsubscribe();
  // }

  addToCart(val) {
    console.log(val);
    this.showModal = false;
    console.log(this.addProduct);
    // console.log("product added to cart item ");
    const integer = parseInt(val, 10);
    const cartData = {
      productId: this.addProduct._id,
      cartId: this.cartId,
      qty: integer,
      cost: (integer * this.addProduct.price),
    }
    console.log(cartData);
    this.dataService.addProductToCart(cartData)
      .subscribe(responseData => {
        console.log(responseData);
        // this.shoppingService.refreshProducts.next();
        this.goGetCart()
      });
  }

  goGetCart() {
    console.log(this.cartId);
    const data = { id: this.cartId }
    console.log(data);
    this.dataService.getCart(data)
      .subscribe(
        res => this.dataService.loadedCart = res,
        () => console.log("I'm done! getting cart"),
        () => this.total = this.dataService.loadedCart.reduce((acc, cur) => acc + cur.total_cost, 0),

        // console.log(this.total)
        // const num = this.total;
        // this.number = num.toFixed(2);
        // console.log(this.loadedCart)
        // (err) => {
        //   if (err instanceof HttpErrorResponse) {
        //     if (err.status === 401) {
        //       this._router.navigate(['/'])
        //     } else if (err.status >= 500) {
        //       this._router.navigate(['/'])
        //     }
        //   }
        // }
      )
  }


  removeFromCart(id) {
    () => console.log("removeFromCart")
    const itemId = { id: id }
    this.dataService.delFromCart(itemId)
      .subscribe(
        res => console.log(res)
      )
    this.goGetCart()
  }




  delAllCart(i) {
    this.dataService.delAllFromCart(i)
      .subscribe(responseData => {
        console.log(responseData);
        this.total = 0;
        this.ngOnInit()
      })
  }

  checkOut() {
    this._router.navigate(['/order'])
  }

}
