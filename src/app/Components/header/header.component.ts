import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/Services/auth.service';
import { UserListService } from 'src/Services/user-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public fullName: string ='';
  constructor(private auth: AuthService,
              private toast: NgToastService,
              private users : UserListService) { }
  source = '/assets/TA1.jfif';
  ngOnInit(): void {

    this.users.getFullName()
    .subscribe(val =>
      {
        let fullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || fullNameFromToken; 
      })
  }

  onLogout(){
    this.auth.onLogout();
    this.toast.success({detail:"SUCCESS",summary:"Logged Out Successfully",duration: 3000});
  }
}
