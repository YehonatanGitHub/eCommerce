import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { responseData } from '../../app/register/responseData.model'
import { ListCity } from '../../app/register/ListCity.model'
import { newUser } from '../../app/register/newUser.model'
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css", "../app.component.css"]
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  passwordCheck = ''; // Confirm with password
  show: Boolean = false;
  listCitys: ListCity[] = [];
  public cityData;
  token: string = null;
  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

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
    console.log(this.signupForm.value.firstStep);
    this.show = true;

    this.dataService.fetchCityNames()
      .subscribe((data) => this.cityData = data);
    console.log(this.cityData);
  }

  onSubmit2(form: NgForm) {
    console.log(form.value);
    const newUser: newUser = {
      tz: this.signupForm.value.firstStep.tz,
      email: this.signupForm.value.firstStep.email,
      password: this.signupForm.value.firstStep.password,
      f_name: form.value.f_name,
      l_name: form.value.l_name,
      city: form.value.city,
      street: form.value.street
    }
    console.log(newUser);
    this.authService.registerUser(newUser)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token)
        // this._router.navigate(['/special'])
      },
        err => console.log(err)
      );
    this.router.navigate(['/']);
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
      this.authService.checkIfUser(tester)
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
}
