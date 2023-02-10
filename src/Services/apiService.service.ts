import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { empTable } from 'src/app/Models/empTableRow';
import { Observable } from 'rxjs';
import { reviewsList } from 'src/app/Models/reviewlist';
import { empReviews } from 'src/app/Models/reviews';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseAPIUrl: string = environment.baseAPIUrl;
  constructor(private http: HttpClient) { }

  getEmpDetails(): Observable<empTable[]>{
    return this.http.get<empTable[]>(this.baseAPIUrl);
  }

  addReviews(addReviewsRequest: reviewsList): Observable<reviewsList>{
    return this.http.post<reviewsList>(this.baseAPIUrl ,addReviewsRequest);
  }

  viewReviews(empID: number): Observable<empReviews[]>{
    return this.http.get<empReviews[]>(this.baseAPIUrl + '/GetReviewbyID/'+ empID);
  }

  deleteEmp(empID: number): Observable<empTable>{
    return this.http.delete<empTable>(this.baseAPIUrl + '/' + empID);
  }

  deleteReviews(reviewID: number): Observable<empReviews>{
    return this.http.delete<empReviews>(this.baseAPIUrl + '/DeleteReview/'+ reviewID)
  }  
}