import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../../home/home.component.css"]
})
export class LoginComponent implements OnInit {
  error = null;
  public token: any;
  constructor(private http: HttpClient) { }
  ngOnInit() { }

  onSubmit(form: NgForm) {

    console.log(form.value);
    this.http.post('http://localhost:3000/users/login', form.value)
      .subscribe((response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
      }, error => {
        console.log(error);
        this.error = error.error;
      });

  }
}
