import { Component, OnInit } from "@angular/core";
import { Register1 } from '../../app/register/register1.model'
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css", "../app.component.css"]
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  passwordCheck = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstStep': new FormGroup({
        'tz': new FormControl(null, Validators.required),
        'email': new FormControl('', [Validators.required,
        Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]),
        'password': new FormControl(null, Validators.required),
        'confirmPassword': new FormControl(null, [Validators.required, this.confirmPasswordToPassword.bind(this)])
      }),
      'secondStep': new FormGroup({
      })
    })
  }
  onSubmit() {
    console.log(this.signupForm);

  }

  chechPassword(event: Event) {
    this.passwordCheck = (<HTMLInputElement>event.target).value;
    console.log(this.passwordCheck);

  }

  confirmPasswordToPassword(control: FormControl): { [s: string]: boolean } {
    if (this.passwordCheck !== control.value) {
      return { 'passwordIsNotConfirmed': true };
    }
    return null;
  }

  // onSubmit(postData: Register1) {
  //   console.log(postData);

  //   this.http.post('http://localhost:3000/users/checkifuser', postData)
  //     .subscribe(responseData => {
  //       console.log(responseData);
  //       // this.shoppingService.refreshProducts.next();
  //     });

  // }
}
