import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/Rental/rentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {
  apiUrl='http://localhost:2958/api/rentals/getrentaldetails'
  constructor(private httpClient:HttpClient) { }
  
  getRentalDetails(): Observable<ListResponseModel<RentalDetail>>{
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl)
  }
}
