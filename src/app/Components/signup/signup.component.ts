import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  visible:boolean = true;
  changetype:boolean =true;
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, 
              private auth: AuthService,
              private router: Router,
              private toast: NgToastService ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email:  ['',[Validators.required, Validators.email]],
      userName: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(15)]],
      passwords: ['',[Validators.required,Validators.minLength(8)]],
  })
  }

  viewPassword(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  signUp(){
    console.log(this.signUpForm.value);
    if(this.signUpForm.valid){
      this.auth.onSignUp(this.signUpForm.value)
      .subscribe({
       next: ((res: { message: string; })=>{this.toast.success({detail:"SUCCESS",summary:res.message,duration: 3000});
                   this.signUpForm.reset();
                   this.router.navigate(['login']);
                 }),      
       error: (err=>{
         this.toast.error({detail:"ERROR",summary:err.error.message,duration: 3000});
       })
      })
    }
    else{
      this.toast.error({detail:"ERROR",summary:"Please fill the form correctly!!!...",duration: 3000});
    }  
  }
  get firstName(){
    return this.signUpForm.get('firstName')
  }
  get lastName(){
    return this.signUpForm.get('lastName')
  }
  get email(){
    return this.signUpForm.get('email')
  }
  get userName(){
    return this.signUpForm.get('userName')
  }
  get passwords(){
    return this.signUpForm.get('passwords')
  }
  

}
