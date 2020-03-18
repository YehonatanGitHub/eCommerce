import { Component, OnInit } from "@angular/core";
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: "app-snapshot",
  templateUrl: "./snapshot.component.html",
  styleUrls: ["./snapshot.component.css", "../../home/home.component.css"]
})
export class SnapshotComponent implements OnInit {
  orders: any;
  products: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getOrders()
    this.getProducts()
  }

  getOrders() {
    this.dataService.getOrders()
      .subscribe(response => {
        console.log(response);
        this.orders = response.message;
      })
  }
  getProducts() {
    this.dataService.getProducts()
      .subscribe(response => {
        console.log(response);
        this.products = response.message;
      })
  }
}


