import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './Components/forms/reviewforms.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { SignupComponent } from './Components/signup/signup.component';
import { TableComponent } from './Components/table/employeetable.component';
import { ViewreviewComponent } from './Components/viewreview/viewreview.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path:'signup', component: SignupComponent },
  { path: 'homepage', component: TableComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forms', component: FormsComponent, canActivate: [AuthGuard] },
  { path: 'forms/:EmpID', component: FormsComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ViewreviewComponent, canActivate: [AuthGuard] },
  { path: 'reviews/:EmpID', component: ViewreviewComponent, canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
