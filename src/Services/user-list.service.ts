import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() { }

  public getRoles(){
    return this.role$.asObservable();
  }

  public setRoles(role: string){
    this.role$.next(role);

  }

  public getFullName(){
    return this.fullName$.asObservable();
  }

  public setFullName(fullname: string){
    this.fullName$.next(fullname);
  }
}
