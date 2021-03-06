import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  currentColor:Color;
  colors: Color[] = [];
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color:Color){
    this.currentColor=color;
  }
  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item list-group-item-danger"
    }else{
      return "list-group-item list-group-item-action list-group-item-warning"
    }
  }
  getAllColorClass(){
    
      return "list-group-item list-group-item-action list-group-item-warning"
      if(this.currentColor){
        "list-group-item list-group-item-success"
      }
     
  }
}
