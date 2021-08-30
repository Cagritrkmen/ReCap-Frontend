import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  filterText="";
  currentCar:CarDetail;
  carDetails: CarDetail[] = [];
  defaultPath="http://localhost:2958"
  defaultImg="/Images/d23d24f4-339a-4fb7-b46c-dadba89bbe87.jpg"
  constructor(private carDetailService: CarDetailService,private activatedRoute:ActivatedRoute, private carImageService:CarImageService) {}

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
    if (params['brandId'] && params['colorId']) {
      this.getCarDetailsByBrandIdAndColorId(params['brandId'], params['colorId']) 
    }
     else if(params["brandId"]){
       this.getCarDetailsByBrandId(params["brandId"]);
     }
     else if(params["colorId"]){
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
  setCurrentCar(car:CarDetail){
    this.currentCar=car;
  }
  getCarDetailsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carDetailService
      .getCarDetailsByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }
  // getCarImagePath(carDetail: CarDetail) {
  //   if (carDetail.imagePath) {
  //     return carDetail.imagePath;
  //   }else{
  //     return carDetail.imagePath='/Images/DefaultImage.jpg';
  //   }
  // }
  // getCarImage(carDetail: CarDetail) {
  //   if (carDetail.carImage) {
  //     return carDetail.imagePath;
  //   }else{
  //     return carDetail.imagePath='/Images/DefaultImage.jpg';
  //   }
  // }
  
}
