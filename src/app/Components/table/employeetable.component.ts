import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/apiService.service';
import { AuthService } from 'src/Services/auth.service';
import { UserListService } from 'src/Services/user-list.service';
import { UserService } from '../../../Services/userreview.service';
import { empTable } from '../../Models/empTableRow';
import { NgConfirmModule } from 'ng-confirm-box';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.css']
})

export class TableComponent implements OnInit {
  displayItem = false;

  empId!: number;
  rows: empTable[] = [];
  public role!: string;

  constructor(
              private toast: NgToastService,
              private confirmService: NgConfirmService,
              private apiService: ApiService,
              private users : UserListService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.dispEmp()

    this.users.getRoles().subscribe(val=>
      {
        let roles = this.auth.getRoleFromToken();
        this.role = val || roles;
      })
    }


  dispEmp(){
    this.apiService.getEmpDetails()
    .subscribe(response => 
      this.rows = response
 
    )
  }

  displayForm(id: number) {
    this.empId = id;
  }

  viewsList(id: number) {
    this.empId = id;
    this.apiService.viewReviews(this.empId)
 
  }

  deleteEmp(id: number) {
    this.confirmService.showConfirm("Do you want to delete the employee?",
    ()=>{
      this.apiService.deleteEmp(id).subscribe(response => this.dispEmp());
      this.toast.success({detail: "SUCCESS", summary:"  Employee deleted successfully  ",duration: 3000});  
    },
    ()=>{
      this.toast.error({detail: "ERROR", summary:"Action interrupted",duration: 3000});
    })
    
}
}