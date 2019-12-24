
import { Component, OnInit, ViewChild } from "@angular/core";
// import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Product } from '../../products/product/product.model'
import { ShoppingService } from '../../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
  // providers: [ShoppingService]

})
export class AdminComponent implements OnInit {
  @ViewChild('postForm', { static: false }) productForm: NgForm;

  private activatedSub: Subscription;
  editProduct: Product;
  isEdit: boolean = false;
  isNew: boolean = false;
  private _opened: boolean = true;
  private newProduct: Product;


  constructor(private http: HttpClient, private shoppingService: ShoppingService) {
    this.activatedSub = this.shoppingService.statuseEditProduct.subscribe(
      (editProduct: Product) => {
        this.editProduct = editProduct;
        // this._opened = true;
        this.isEdit = true;
        this.isNew = false;
        console.log(this.isEdit);
        console.log(this.editProduct);

        this.productForm.setValue({
          proname: this.editProduct.proname,
          price: this.editProduct.price,
          picture: this.editProduct.picture,
          category: this.editProduct.category
        });
      }
      // working --- console.log(editProduct)
      // this.editProduct = editProduct
      //  ).next(console.log(this.editProduct)) 
      // this._toggleAddProduct()
    );
  }

  ngOnInit() {
    // this.editProduct = this.shoppingService.editProduct;
    // console.log(this.editProduct);
    console.log(this.isEdit);
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }

  private _toggleAddProduct() {
    this.isNew = !this.isNew;
    this.isEdit = false;
    this.productForm.setValue({
      proname: "",
      price: "",
      picture: "",
      category: ""
    });
  }
  // { proname: string; parice: number; picture: string; category: string }
  onSubmit(postData: Product) {
    console.log("product sent to POST");
    this.newProduct = postData;
    this.http.post('http://localhost:3000/admin/add-product', postData).subscribe(responseData => {
      console.log(responseData);
    });
  }


}

