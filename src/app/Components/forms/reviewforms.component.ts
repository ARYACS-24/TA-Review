import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { empTable } from 'src/app/Models/empTableRow';
import { ApiService } from 'src/Services/apiService.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reviewforms',
  templateUrl: './reviewforms.component.html',
  styleUrls: ['./reviewforms.component.css']
})

export class FormsComponent implements OnInit {
  empId!: number;
  Employee?: empTable

  constructor(
              private apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              private toast: NgToastService
              ) { }

  ngOnInit(): void {
    this.empId = Number(this.activatedRoute.snapshot.paramMap.get('EmpID'));
  }

  reviewForm = new FormGroup({
    rDate: new FormControl('', [Validators.required]),
    feedback: new FormControl('', [Validators.required]),
  });

  reviewSubmit() {
    let review = {
      empID: this.empId,
      rDate:new Date(this.reviewForm.get('rDate')?.value || ''),
      feedback: this.reviewForm.get('feedback')?.value || ''
    };
    this.apiService.addReviews(review)
    .subscribe()
    this.reviewForm.reset();
    this.toast.success({detail:"SUCCESS",summary:"Review added successfully",duration: 3000});

  }
  get rDate() {
    return this.reviewForm.get('rDate');
  }
  get feedback() {
    return this.reviewForm.get('feedback');
  }
}