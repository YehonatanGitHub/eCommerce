import { Component, OnInit } from "@angular/core";
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { newOrder } from '../../app/order/newOrder.model'

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css", "../app.component.css"]
})
export class OrderComponent implements OnInit {
  total: Number;
  newOrder: any;
  cartId: any = this.authService.decodedToken.cartId;
  showModal: Boolean = false;

  constructor(public authService: AuthService, public dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this.cartId = this.authService.decodedToken.cartId;
    this.goGetCart()
    console.log(this.authService.decodedToken);

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

      )
  }

  goBackShop() {
    this._router.navigate(['/shopping'])
  }
  redirect() {
    this._router.navigate(['/'])
    this.showModal = false;

  }
  onSubmit(form: NgForm) {
    const newOrder: newOrder = {
      city: form.value.city,
      street: form.value.street,
      date_to_deliver: form.value.date,
      card: form.value.cardNumber,
      user: this.authService.decodedToken.userId,
      cart: this.authService.decodedToken.cartId,
      cost: this.total,
      date: new Date()
    }
    console.log(newOrder);
    this.dataService.placeOrder(newOrder)
      .subscribe(responseData => {
        console.log(responseData);
        this.showModal = true;
      })

  }

}