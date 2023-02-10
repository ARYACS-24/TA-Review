import { Injectable } from '@angular/core';
import { empTable } from 'src/app/Models/empTableRow';
import { empDetails } from 'src/app/Models/model';
import { reviewsList } from 'src/app/Models/reviewlist';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  reviewsList: reviewsList[] = [];
  selectedReview: reviewsList[] = [];
  rows: empTable[] = [];

  constructor() { this.rows = empDetails}

  addReviews(review: any) {
    this.reviewsList.push(review)
  }

  viewReview(selectedID: number) {
     this.selectedReview = this.reviewsList.filter(data => data.empID === selectedID)
  }
}