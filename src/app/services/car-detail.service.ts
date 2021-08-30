import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = 'http://localhost:2958/api/';
  constructor(private httpClient: HttpClient) {}

  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrandId(brandId:number){
    let newPath =this.apiUrl+"cars/getcardetailsbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)

  }
  getCarsByColorId(colorId:number){
    let newPath =this.apiUrl+"cars/getcardetailsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)

  }
  getCarDetailsByCarId(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath=this.apiUrl +"cars/getcardetailsbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByBrandIdAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetailsbybrandidandcolorid?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
}
