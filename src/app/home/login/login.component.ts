import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../../home/home.component.css"]
})
export class LoginComponent implements OnInit {
  error = null;
  public token: any;
  helper = new JwtHelperService();

  constructor(private authService: AuthService, private _router: Router) { }
  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.loginUser(form.value)
      .subscribe((response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.authService.decodedToken = this.helper.decodeToken(response.token);
        console.log(this.authService.decodedToken);
        if (this.authService.decodedToken.role == '5de3894a38512832c47e4670') {
          console.log('user is admin');
          this.authService.adminUser = true;
          this._router.navigate(['/shopping'])
        } else {
          console.log('user is not admin');
          this.authService.regularUser = true;
        }
      }, err => {
        console.log('got the error');
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // this._router.navigate(['/'])
            console.log('need to route');

          } else if (err.status >= 500) {
            this._router.navigate(['/'])
          }
        }
        this.error = err.error;
        console.log(this.error);
        console.log('error my message');
      });
    form.reset();
  }
  onClick() {
    this._router.navigate(['/shopping'])
  }


}
