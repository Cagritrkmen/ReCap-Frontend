import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailResponseModel } from '../models/rentalDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {
  apiUrl='http://localhost:2958/api/rentals/getrentaldetails'
  constructor(private httpClient:HttpClient) { }
  
  getRentalDetails(): Observable<RentalDetailResponseModel>{
    return this.httpClient.get<RentalDetailResponseModel>(this.apiUrl)
  }
}
