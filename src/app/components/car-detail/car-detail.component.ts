import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  cars: CarDetail[] = [];
  carDto:CarDetail
  Images:string[]=[]
  imageBasePath="http://localhost:2958"
  defaultImage="/Images/d23d24f4-339a-4fb7-b46c-dadba89bbe87.jpg"

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params["carId"]){ 
        this.getCarDetailsByCarId(params["carId"]);
      } else {

        this.getCarDetails();
      }
    });
  }
  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarDetailsByCarId(carId:number) {
    this.carDetailService.getCarDetailsByCarId(carId).subscribe((response) => {
        this.carDto = response.data;
        this.Images=this.carDto.imagePath;
        if(this.Images.length==0){
          this.Images.length=100
        }
        console.log(this.Images.length)
      }); 
    }
  

}
