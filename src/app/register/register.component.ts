import { Component, OnInit } from "@angular/core";
import { Register1 } from '../../app/register/register1.model'
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css", "../app.component.css"]
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  passwordCheck = ''; // Confirm with password
  tzCheckDb = {
    tz: Number
  };
  userExists = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstStep': new FormGroup({
        'tz': new FormControl(null, [Validators.required, Validators.min(10000000), Validators.max(999999999)], this.checkIfUserExists.bind(this)),
        'email': new FormControl('', [Validators.required,
        Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
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
  }

  confirmPasswordToPassword(control: FormControl): { [s: string]: boolean } {
    if (this.passwordCheck !== control.value) {
      return { 'passwordIsNotConfirmed': true };
    }
    return null;
  }


  checkIfUserExists(control: FormControl): Promise<any> | Observable<any> {
    this.tzCheckDb = { tz: control.value };
    const promise = new Promise<any>((resolve, reject) => {
      this.http.post('http://localhost:3000/users/checkifuser', this.tzCheckDb)
        .subscribe(responseData => {
          console.log(responseData);
          if (responseData == true) {
            resolve({ 'userExists': true });
          } else {
            resolve(null);
          }

        });
    });
    return promise;
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
