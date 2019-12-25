
import { Component, OnInit, ViewChild } from "@angular/core";
// import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Product } from '../../products/product/product.model'
import { ShoppingService } from '../../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],

})
export class AdminComponent implements OnInit {
  @ViewChild('postForm', { static: false }) productForm: NgForm;

  private activatedSub: Subscription;
  editProduct: Product;
  isEdit: boolean = false;
  isNew: boolean = false;
  private _opened: boolean = false;
  private newProduct: Product;

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 10);
    });
  }

  constructor(private http: HttpClient, private shoppingService: ShoppingService) {
    this.activatedSub = this.shoppingService.statuseEditProduct.subscribe(
      (editProduct: Product) => {
        this.editProduct = editProduct;
        this._opened = true;
        this.isEdit = true;
        this.isNew = false;
        console.log(this.isEdit);
        console.log(this.editProduct);
        console.log(this.editProduct._id);
        this.waitForOneSecond().then(() =>
          this.productForm.setValue({
            proname: this.editProduct.proname,
            price: this.editProduct.price,
            picture: this.editProduct.picture,
            category: this.editProduct.category
          })
        );
      }
    );
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }

  private _toggleAddProduct() {
    this.isNew = true;
    this.isEdit = false;
    this._opened = !this._opened;
    if (this.productForm == undefined) {
    } else {
      this.productForm.setValue({
        proname: "",
        price: "",
        picture: "",
        category: ""
      });
      this.editProduct = undefined;
    }
  }

  onSubmit(postData: Product) {
    if (this.editProduct == undefined) {
      console.log("NEW product sent to POST");
      this.newProduct = postData;
      this.http.post('http://localhost:3000/admin/add-product', postData)
        // .pipe(
        //   tap(() => {
        //     this.shoppingService.refreshProducts.next();
        //   })
        // )
        .subscribe(responseData => {
          console.log(responseData);
        });
      this.productForm.setValue({
        proname: "",
        price: "",
        picture: "",
        category: ""
      });
      this._opened = false;
    } else {

      let productEditInfo = {
        _id: this.editProduct._id,
        proname: postData.proname,
        price: postData.price,
        picture: postData.picture,
        category: postData.category
      }
      console.log(productEditInfo);
      this.http.post('http://localhost:3000/admin/edit-product', productEditInfo)

        .subscribe(responseData => {
          console.log(responseData);
        });

      this.shoppingService.refreshProducts.next(true);


      console.log("Edit product sent");
      this.productForm.setValue({
        proname: "",
        price: "",
        picture: "",
        category: ""
      });
      this.editProduct = undefined;
      this._opened = false;

    }
  }
}

