import { Component, OnInit } from "@angular/core";
import { ShoppingService } from './shopping.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: "app-shopping",
  templateUrl: "./shopping.component.html",
  styleUrls: ["./shopping.component.css", "../../app/app.component.css"],
  providers: [ShoppingService]
})
export class ShoppingComponent implements OnInit {
  private _opened: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
