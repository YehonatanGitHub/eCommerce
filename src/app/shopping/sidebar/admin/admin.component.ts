import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../../shared/data.service"
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]

})
export class AdminComponent implements OnInit {
  private _opened: boolean = false;
  newProduct: '';
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() { }
  private _toggleAddProduct() {
    this._opened = !this._opened;
  }
  onSubmit(postData: { proname: string; parice: number; picture: string; category: string }) {
    console.log(postData);
    this.http.post('http://localhost:3000/admin/add-product', postData).subscribe(responseDara => {
      console.log(responseDara);


    });

  }
}
