import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { reviewsList } from 'src/app/Models/reviewlist';
import { empReviews } from 'src/app/Models/reviews';
import { ApiService } from 'src/Services/apiService.service';
import { AuthService } from 'src/Services/auth.service';
import { UserListService } from 'src/Services/user-list.service';
import { UserService } from 'src/Services/userreview.service';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-viewreview',
  templateUrl: './viewreview.component.html',
  styleUrls: ['./viewreview.component.css']
})
export class ViewreviewComponent implements OnInit {

  empId!: number;
  reviewsData: empReviews[] = [];
  public role!: string;

  constructor(private navService: UserService,
    private confirmService: NgConfirmService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private users: UserListService,
    private auth: AuthService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.empId = Number(this.activatedRoute.snapshot.paramMap.get('EmpID'));
    this.viewReview();
    this.users.getRoles().subscribe(val => {
      let roles = this.auth.getRoleFromToken();
      this.role = val || roles;
    })

  }
  viewReview() {
    this.apiService.viewReviews(this.empId)
      .subscribe(res => {
        this.reviewsData = res
        console.log(res, 123)
      });
  }

    delReview(id: number) {
       this.confirmService.showConfirm("Do you want to delete the review?",
      ()=>{
          this.apiService.deleteReviews(id).subscribe(res => {
          this.viewReview();
          this.toast.success({ detail: "SUCCESS", summary: "Review deleted successfully", duration: 3000 });
        });
      },
      ()=>{
        this.toast.error({detail: "ERROR", summary:"Action interrupted",duration: 3000});
      }) 
      
  }


}