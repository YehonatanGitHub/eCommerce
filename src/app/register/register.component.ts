import { Component, OnInit } from "@angular/core";
import { Register1 } from '../../app/register/register1.model'
import { HttpClient } from "@angular/common/http";
import { responseData } from '../../app/register/responseData.model'
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
  // responseData = {
  //   result: Boolean
  // };
  userExists = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstStep': new FormGroup({

        'tz': new FormControl(null, [Validators.required, Validators.pattern(/^(?!0{2})[0-9]{9}$/)], this.checkIfUserExists.bind(this)),
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
    const tester = { tz: control.value }
    console.log(tester);

    const promise = new Promise<any>((resolve, reject) => {
      this.http.post('http://localhost:3000/users/checkifuser', tester)
        .subscribe((responseData: responseData) => {
          console.log(responseData.result);

          if (responseData.result === true) {
            console.log('userExists true');
            resolve({ 'userExists': true });
          } else {
            console.log('null');
            resolve(null);
          }

        })
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
