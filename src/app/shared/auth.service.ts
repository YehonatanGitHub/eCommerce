import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../home/login/user.model';
import { Router } from '@angular/router'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class AuthService {

    decodedToken: any;   // new Subject<User>();
    regularUser: boolean = false;
    adminUser: boolean = false;
    private _registerUrl = 'http://localhost:3000/users/add-user';
    private _checkIfUserUrl = 'http://localhost:3000/users/checkifuser';
    private _loginUrl = 'http://localhost:3000/users/login';


    constructor(private http: HttpClient, private _router: Router) { }

    registerUser(newUser) {
        return this.http.post<any>(this._registerUrl, newUser)
    }

    checkIfUser(testeId) {
        return this.http.post<any>(this._checkIfUserUrl, testeId)
    }

    loginUser(user) {
        return this.http.post<any>(this._loginUrl, user)
    }
    //   logoutUser() {
    //     localStorage.removeItem('token')
    //     this._router.navigate(['/events'])
    //   }
    getToken() {
        return localStorage.getItem('token')
    }

    loggedIn() {
        return !!localStorage.getItem('token')
    }
    logoutUser() {
        localStorage.removeItem('token')
        this._router.navigate(['/'])
        this.adminUser = false;
        this.regularUser = false;
    }
    isAdmin() {
        if (this.decodedToken.role == "5de3894a38512832c47e4670") {
            return true;
        } else {
            return false;
        }

    }
}