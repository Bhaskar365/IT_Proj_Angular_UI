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

  updateForm = new FormGroup({

    token: new FormControl('', [Validators.required]),
    DevId : new FormControl({value:'',disabled:true}, [Validators.required]),
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
               private matDialog:MatDialogRef<EditProductComponent> 
             ) { }

    ngOnInit() {

      this.updateForm.patchValue(this.data.id);
      this.userData = this.data.id;
    }

    //update submit
    updateFormSubmit() {

      let formData = this.updateForm.value as string;

      this.api.updateDataFunc(formData).pipe(catchError((err:any)=> {
        return err;
      })).subscribe(res=> {
        console.log(res);
      });
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

    dateChange1(dateVal1:any){

      let y1 = dateVal1._model.selection;
      let z1 = moment(y1);
      let zz1 = moment(z1).format('YYYY-MM-DD');
      this.modifiedDate1 = zz1;
      console.log('dateChange1');
      console.log(this.modifiedDate1);
      return this.modifiedDate1;
    }
  
    dateChange2(dateVal2:any){
  
      let y2 = dateVal2._model.selection;
      let z2 = moment(y2);
      let zz2 = moment(z2).format('YYYY-MM-DD');
      this.modifiedDate2 = zz2;
      console.log('dateChange2');
      console.log(this.modifiedDate2);
      return this.modifiedDate2;
    }
  
    dateChange3(dateVal3:any){
  
      let y3 = dateVal3._model.selection;
      let z3 = moment(y3);
      let zz3 = moment(z3).format('YYYY-MM-DD');
      this.modifiedDate3 = zz3;
      console.log('dateChange3');
      console.log(this.modifiedDate3);
      return this.modifiedDate3;
    }

    closeDialog() {
      this.matDialog.close();
    }
  

  }