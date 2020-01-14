import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../../home/home.component.css"]
})
export class LoginComponent implements OnInit {
  error = null;
  public token: any;
  constructor(private authService: AuthService) { }
  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.loginUser(form.value)
      .subscribe((response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
      }, error => {
        console.log(error);
        this.error = error.error;
      });
    form.reset();

  }
}
