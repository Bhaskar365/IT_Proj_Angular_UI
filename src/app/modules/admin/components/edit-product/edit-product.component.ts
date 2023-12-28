import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})

export class EditProductComponent implements OnInit {

  userId:any;
  userData:any;
  modifiedDate1:any;
  modifiedDate2:any;
  modifiedDate3:any;
  purchaseModifiedDate:any;
  warrantyExpModifiedDate:any;
  serviceExpModifiedDate:any;

  purchaseFormDate:any;
  warrantyExpFormDate:any;
  serviceExpFormDate:any;
  dateSample:any;

  updateForm = new FormGroup({

    token: new FormControl('', [Validators.required]),
    DevId : new FormControl('', [Validators.required]),
    DevType : new FormControl('', [Validators.required]),
    DevTypeOther : new FormControl('', [Validators.required]),
    Make : new FormControl('', [Validators.required]),
    Model : new FormControl('', [Validators.required]),
    Owner : new FormControl('', [Validators.required]),
    Location : new FormControl('', [Validators.required]),
    Serial : new FormControl('', [Validators.required]),
    PurchaseDate : new FormControl('', [Validators.required]),
    WarrantyExpDate : new FormControl('', [Validators.required]),
    ServiceExpDate : new FormControl('', [Validators.required]),
    Value : new FormControl('' , [Validators.required]),
    Size : new FormControl('', [Validators.required]),
    Toner : new FormControl('', [Validators.required]),
    MacAddress : new FormControl('', [Validators.required]),
    IPAddress : new FormControl('', [Validators.required]),
    CellNumber : new FormControl('', [Validators.required])

  });

  constructor( private api:ApiServiceService, 
               @Inject(MAT_DIALOG_DATA) public data:any,
               private matDialog:MatDialogRef<EditProductComponent> ,
               public datePipe:DatePipe
               ) { }

    ngOnInit() 
    {
      // this.updateForm.patchValue(this.data.id);
      this.userData = this.data.id;

      console.log(this.userData);

      this.updateForm.patchValue({
        token: this.userData.token,
        DevId: this.userData.DevId,
        DevType: this.userData.DevType,
        DevTypeOther : this.userData.DevTypeOther,
        Make : this.userData.Make,
        Model : this.userData.Model,
        Owner: this.userData.Owner,
        Location : this.userData.Location,
        Serial : this.userData.Serial,
        PurchaseDate: this.convertToDate(this.userData.PurchaseDate),
        WarrantyExpDate: this.convertToDate(this.userData.WarrantyExpDate),
        ServiceExpDate: this.convertToDate(this.userData.ServiceExpDate),
        Value : this.userData.Value,
        Size : this.userData.Size,
        Toner: this.userData.Toner,
        MacAddress : this.userData.MacAddress,
        IPAddress: this.userData.IPAddress,
        CellNumber : this.userData.CellNumber
      });
    }

    convertToDate(dateString: string | undefined): string | null {
      // Add your own logic to handle invalid date strings
      if (!dateString) {
        return null;
      }
    
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date.toISOString();
    }
    
    //test message
    //update submit
    updateFormSubmit() {
      // Clone the form value to avoid modifying the original form
      const formData = { ...this.updateForm.value };
    
      // Convert dates to strings, handling undefined values
      formData.PurchaseDate = this.formatDate(formData.PurchaseDate);
      formData.WarrantyExpDate = this.formatDate(formData.WarrantyExpDate);
      formData.ServiceExpDate = this.formatDate(formData.ServiceExpDate);
    
      // Now formData contains formatted date values, you can send it to the server
      this.api.updateDataFunc(formData).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    
    formatDate(date: Date | string | null | undefined): string | null {
      if (date instanceof Date) {
        // If it's a Date object, convert it to ISO string
        return date.toISOString();
      } else if (typeof date === 'string' && date.trim() !== '') {
        // If it's a non-empty string, leave it as is
        return date;
      } else {
        // If it's null, undefined, or an empty string, return null
        return null;
      }
    }
    
    get Token_Func() {
      return this.updateForm.get('token');
    }

    get DevId_Func() {
      return this.updateForm.get('DevId');
    }

    get DevType_Func() {
      return this.updateForm.get('DevType');
    }

    get DevTypeOther_Func() {
      return this.updateForm.get('DevTypeOther');
    }

    get Make_Func() {
      return this.updateForm.get('Make');
    }

    get Model_Func() {
      return this.updateForm.get('Model');
    }

    get Owner_Func() {
      return this.updateForm.get('Owner');
    }

    get Location_Func() {
      return this.updateForm.get('Location');
    }

    get Serial_Func() {
      return this.updateForm.get('Serial');
    }

    get PurchaseDate_Func() {
      return this.updateForm.get('PurchaseDate');
    }

    get WarrantyExpDate_Func() {
      return this.updateForm.get('WarrantyExpDate');
    }

    get ServiceExpDate_Func() {
      return this.updateForm.get('ServiceExpDate');
    }

    get Value_Func() {
      return this.updateForm.get('Value');
    }

    get Size_Func() {
      return this.updateForm.get('Size');
    }

    get Toner_Func() {
      return this.updateForm.get('Toner');
    }

    get MacAddress_Func() {
      return this.updateForm.get('MacAddress');
    }

    get IPAddress_Func() {
      return this.updateForm.get('IPAddress');
    }

    get CellNumber_Func() {
      return this.updateForm.get('CellNumber');
    }

    getTokenErrorMessage() {
      return this.updateForm.controls?.['token'].hasError('required')?'Enter token':'';
    }

    dateChange1(dateVal1: any) {
      let y1 = dateVal1._model.selection;
      let z1 = moment(y1);
      let zz1 = moment(z1).format('YYYY-MM-DD');
      this.updateForm.get('PurchaseDate')?.setValue(zz1);
    }
    
    dateChange2(dateVal2: any) {
      let y2 = dateVal2._model.selection;
      let z2 = moment(y2);
      let zz2 = moment(z2).format('YYYY-MM-DD');
      this.updateForm.get('WarrantyExpDate')?.setValue(zz2);
    }
    
    dateChange3(dateVal3: any) {
      let y3 = dateVal3._model.selection;
      let z3 = moment(y3);
      let zz3 = moment(z3).format('YYYY-MM-DD');
      this.updateForm.get('ServiceExpDate')?.setValue(zz3);
    }

    closeDialog() {
      this.matDialog.close();
    }
  

  }