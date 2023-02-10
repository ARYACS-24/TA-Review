import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/Services/auth.service';
import { UserListService } from 'src/Services/user-list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  visible:boolean = true;
  changetype:boolean =true;
  constructor(private router:Router,
              private auth: AuthService,
              private toast: NgToastService,
              private user: UserListService) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup ({
    username: new FormControl('',[Validators.required]),
    passwords: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
  })

  get username() {
    return this.loginForm.get('username');
  }
  get passwords() {
    return this.loginForm.get('passwords');
  }

  showPassword(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  onLogin(){
    console.log(this.loginForm.value);
    this.auth.onLogin(this.loginForm.value)
    .subscribe({
      next:(res)=>{this.loginForm.reset();
                  this.auth.storeToken(res.token);
                  const tokenPayload= this.auth.decodedToken();
                  this.user.setFullName(tokenPayload.unique_name);
                  this.user.setRoles(tokenPayload.role);
                  this.toast.success({detail:"SUCCESS",summary:res.message,duration: 3000});
                  this.router.navigate(['home']);
                  },
      error:(err)=>{
                    this.toast.error({detail:"ERROR",summary:"Incorrect username or password",duration: 3000});}
                })
              }
}
