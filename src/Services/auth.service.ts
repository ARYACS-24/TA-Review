import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl:string = 'https://localhost:7040/api/User/';
 private userPayload: any;
  constructor(private http: HttpClient,
              private router: Router) {
                this.userPayload = this.decodedToken();
               }

  onSignUp(userObj: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'register',userObj);
  }
  onLogin(loginObj: any):Observable<any>{
    return this.http.post<any>(this.baseUrl + 'authenticate',loginObj);
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
}
