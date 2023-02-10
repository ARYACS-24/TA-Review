import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from 'src/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router:Router,
    private toast: NgToastService){}
  canActivate(): boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }
    this.toast.error({detail:"ERROR",summary:"Please Login"})
    this.router.navigate(['login'])
    return false;
  }
  
}
