import { Component, OnInit } from "@angular/core";
import { ShoppingService } from './shopping.service';

@Component({
  selector: "app-shopping",
  templateUrl: "./shopping.component.html",
  styleUrls: ["./shopping.component.css", "../../app/app.component.css"],
  providers: [ShoppingService]
})
export class ShoppingComponent implements OnInit {
  private _opened: boolean = true;

  constructor() { }

  ngOnInit() { }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
