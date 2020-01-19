import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
// import { LoginComponent } from "./home/login/login.component";
// import { SnapshotComponent } from "./home/snapshot/snapshot.component";
import { RegisterComponent } from "./register/register.component";
import { OrderComponent } from "./order/order.component";
import { ProductsComponent } from "./shopping/products/products.component";
import { ShoppingComponent } from "./shopping/shopping.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "order", component: OrderComponent },
  { path: "products", component: ProductsComponent },
  {
    path: "shopping", component: ShoppingComponent,
    canActivate: [AuthGuard]
  },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
