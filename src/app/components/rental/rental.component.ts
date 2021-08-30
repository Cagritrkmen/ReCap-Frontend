import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/Rental/rentalDetail';
import { RentalDetailService } from 'src/app/services/rental-detail.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentalDetails: RentalDetail[] = [];
  constructor(private rentalDetailService: RentalDetailService) {}

  ngOnInit(): void {
    this.getRentalDetails();
  }
  getRentalDetails() {
    this.rentalDetailService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
    });
  }
}
