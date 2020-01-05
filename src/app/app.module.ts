import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SidebarModule } from "ng-sidebar";
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./home/login/login.component";
import { SnapshotComponent } from "./home/snapshot/snapshot.component";
import { RegisterComponent } from "./register/register.component";
import { ShoppingComponent } from "./shopping/shopping.component";
import { ProductsComponent } from "./shopping/products/products.component";
import { SidebarComponent } from "./shopping/sidebar/sidebar.component";
import { CartComponent } from "./shopping/sidebar/cart/cart.component";
import { AdminComponent } from "./shopping/sidebar/admin/admin.component";
import { OrderComponent } from "./order/order.component";
import { ProductComponent } from "./shopping/products/product/product.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SnapshotComponent,
    RegisterComponent,
    ShoppingComponent,
    ProductsComponent,
    SidebarComponent,
    CartComponent,
    AdminComponent,
    OrderComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
