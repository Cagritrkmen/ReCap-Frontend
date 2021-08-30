import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filtered',
  templateUrl: './car-filtered.component.html',
  styleUrls: ['./car-filtered.component.css']
})
export class CarFilteredComponent implements OnInit {
  colors:Color[]
  brands:Brand[]
  currentBrandId:number;
  currentColorId:number;


  constructor(private brandService:BrandService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors()
    this.getBrands()
  }
  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors=response.data
    })
  }
  setCurrentBrand(brandId:number){
    return(brandId===this.currentBrandId?true:false)
  }
  setCurrentColor(colorId:number){
    return(colorId===this.currentColorId?true:false)
  }


}
