import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { MatButtonModule } from '@angular/material/button';
import * as moment from 'moment';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule, FormsModule, MatSelectModule,
    CommonModule, MatIconModule, MatDialogModule, MatButtonModule, FormsModule,
    MatCardModule, MatDialogModule]
})

export class AddProductComponent implements OnInit {

  x: any;
  xx: any;
  a: any;
  public isDataLoading: boolean = false;
  modifiedDate1: any;
  modifiedDate2: any;
  modifiedDate3: any;

  formControlVar1!: string | null;
  formControlVar2: any;
  formControlVar3: any;

  addForm = new FormGroup({

    token: new FormControl('', [Validators.required]),
    DevType: new FormControl('', [Validators.required]),
    DevTypeOther: new FormControl('', [Validators.required]),
    Make: new FormControl('', [Validators.required]),
    Model: new FormControl('', [Validators.required]),
    Owner: new FormControl('', [Validators.required]),
    Location: new FormControl('', [Validators.required]),
    Serial: new FormControl('', [Validators.required]),
    PurchaseDate: new FormControl('', [Validators.required]),
    WarrantyExpDate: new FormControl('', [Validators.required]),
    ServiceExpDate: new FormControl('', [Validators.required]),
    Value: new FormControl('', [Validators.required]),
    Size: new FormControl('', [Validators.required]),
    Toner: new FormControl('', [Validators.required]),
    MacAddress: new FormControl('', [Validators.required]),
    IPAddress: new FormControl('', [Validators.required]),
    CellNumber: new FormControl('', [Validators.required])
  })

  get Token_Func() {

    return this.addForm.get('token');
  }
  get DevType_Func() {
    return this.addForm.get('DevType');
  }
  get DevTypeOther_Func() {
    return this.addForm.get('DevTypeOther');
  }
  get Make_Func() {
    return this.addForm.get('Make');
  }
  get Model_Func() {
    return this.addForm.get('Model');
  }
  get Owner_Func() {
    return this.addForm.get('Owner');
  }
  get Location_Func() {
    return this.addForm.get('Location');
  }
  get Serial_Func() {
    return this.addForm.get('Serial');
  }
  get PurchaseDate_Func() {
    return this.addForm.get('PurchaseDate');
  }
  get WarrantyExpDate_Func() {
    return this.addForm.get('WarrantyExpDate');
  }
  get ServiceExpDate_Func() {
    return this.addForm.get('ServiceExpDate');
  }
  get Value_Func() {
    return this.addForm.get('Value');
  }
  get Size_Func() {
    return this.addForm.get('Size');
  }
  get Toner_Func() {
    return this.addForm.get('Toner');
  }
  get MacAddress_Func() {
    return this.addForm.get('MacAddress');
  }
  get IPAddress_Func() {
    return this.addForm.get('IPAddress');
  }
  get CellNumber_Func() {
    return this.addForm.get('CellAddress');
  }

  constructor(private fb: FormBuilder,
    private http: HttpClient, private route: Router,
    private dialogRef: MatDialog,
    private api: ApiServiceService) { }

  ngOnInit(): void { }

  addFormSubmit() {
    // string type assertion
    this.x = this.addForm.value as string;

    this.isDataLoading = true;
    this.api.addDataFunc(this.x)
      .pipe(catchError((err: any) => {
        Swal.fire({
          title: 'Create Unsuccessful',
          text: 'Error Creating New Employee!',
          icon: 'error',
          width: '800px',
          timer: 1500,
          timerProgressBar: true
        });
        this.isDataLoading = false;
        this.route.navigate(['/error']);
        return err;
      })).subscribe((res:any) => {
        console.log(res.msg); 
        this.isDataLoading = false;
        if(res.msg == 'Invalid Token') 
        {
          console.log(" invalid token "+ res); 
        }
        else 
        { 
          console.log(res); 
        }
        Swal.fire({
          title: 'Added Successfully',
          text: 'Adding New Employee Successfully ',
          icon: 'success',
          width: '800px',
          timer: 1500,
          timerProgressBar: true,
        });
        this.route.navigate(['/admin/product-homepage']);
        
      });
  }

  goBackBtn() {
    this.route.navigate(["admin/product-homepage"]);
  }

  dateChange1(dateVal1: any) {

    let y1 = dateVal1._model.selection;
    let z1 = moment(y1);
    let zz1 = moment(z1).format('YYYY-MM-DD');
    this.modifiedDate1 = zz1;
    return this.modifiedDate1;
  }

  dateChange2(dateVal2: any) {

    let y2 = dateVal2._model.selection;
    let z2 = moment(y2);
    let zz2 = moment(z2).format('YYYY-MM-DD');
    this.modifiedDate2 = zz2;
    return this.modifiedDate2;
  }

  dateChange3(dateVal3: any) {

    let y3 = dateVal3._model.selection;
    let z3 = moment(y3);
    let zz3 = moment(z3).format('YYYY-MM-DD');
    this.modifiedDate3 = zz3;
    return this.modifiedDate3;
  }
}
