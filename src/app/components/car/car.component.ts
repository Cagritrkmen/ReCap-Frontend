import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = [];
  constructor(private carDetailService: CarDetailService,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
     if(params["brandId"]){
       this.getCarDetailsByBrandId(params["brandId"]);
     }
     if(params["colorId"]){
       this.getCarDetailsByColorId(params["colorId"]);
     }
     else{
       this.getCarDetails();
     }
   })
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarDetailsByBrandId(brandId:number) {
    this.carDetailService.getCarsByBrandId(brandId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarDetailsByColorId(ColorId:number) {
    this.carDetailService.getCarsByColorId(ColorId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
}
