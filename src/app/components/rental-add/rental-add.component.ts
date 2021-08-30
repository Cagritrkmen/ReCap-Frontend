import { DatePipe } from '@angular/common';
import { DeclarationListEmitMode } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/Rental/rental';
import { RentalDetail } from 'src/app/models/Rental/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalDetailService } from 'src/app/services/rental-detail.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  car: CarDetail;
  carDetail: CarDetail;
  rentalAddForm: FormGroup;
  currentDate: Date = new Date();
  datePipe: DatePipe;
  rentDate: string | null;
  returnDate: string | null;
  customers: Customer[];
  carId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rentalService: RentalDetailService,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService
  ) {}

  ngOnInit(): void {
    this.getCar();
    this.createRentalAddForm();
    this.getCustomers();
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: [null],
    });
  }

  getCar() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = +params['carId'];
        console.log(this.carId);

        this.carDetailService.getCarDetailsByCarId(this.carId).subscribe(
          (response) => {
            console.log(response);

            this.car = response.data;
          },
          (responseError) => {
            this.router.navigate(['']);
          }
        );
      }
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  add() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      this.checkDate(rentalModel);
      this.calculatePayment(rentalModel);
      this.router.navigate(['payment']);
      //  this.router.navigate(["/payment", JSON.stringify(rentalModel)]).then(c=>window.location.reload())
      this.toastrService.info(
        'Ödeme sayfasına yönlendiriliyorsunuz.',
        'Ödeme İşlemleri'
      );
    } else {
      this.toastrService.error('Dikkat', 'Kiralanamadı, Formunuz Eksik');
    }
  }
  calculatePayment(rental: RentalDetail) {
    if (rental.returnDate != null) {
      var returnDate = new Date(rental.returnDate.toString());
      var rentDate = new Date(rental.rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();

      var rentDays = Math.ceil(difference / (1000 * 3600 * 24));

      rental.totalPrice = rentDays * this.car.dailyPrice;

      if (rental.totalPrice <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Ana sayfaya yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }
  checkDate(rentalModel: Rental) {
    let rentDate = new Date(rentalModel.rentDate);
    let returnDate = new Date(rentalModel.returnDate);
    if (rentDate < this.currentDate) {
      this.toastrService.warning(
        'Kiralama Tarihi, bu günden sonraki günler olmalıdır',
        'Dikkat'
      );
    }
    if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
      this.toastrService.warning(
        'Dönüş Tarihi, kiralama tarihinden sonraki günler olmalıdır'
      );
    }
  }
}
