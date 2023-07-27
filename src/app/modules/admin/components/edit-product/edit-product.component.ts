import { Component, Inject, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  userId:any;
  userData:any;

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
    PurchaseDate : new FormControl('' , [Validators.required]),
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
               private matDialog:MatDialogRef<EditProductComponent> 
             ) { }

    ngOnInit() {

      this.updateForm.patchValue(this.userData);
      this.userData = this.data.id;
    }

    updateFormSubmit() {
      console.log(123);
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

  }