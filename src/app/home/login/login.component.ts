import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../../home/home.component.css"]
})
export class LoginComponent implements OnInit {
  error = null;
  public token: any;
  helper = new JwtHelperService();
  user = false;
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
          this._router.navigate(['/shopping'])
        } else {
          console.log('user is not admin');
          this.user = true;
        }
      }, error => {
        console.log(error);
        this.error = error.error;
      });
    form.reset();
  }
}
