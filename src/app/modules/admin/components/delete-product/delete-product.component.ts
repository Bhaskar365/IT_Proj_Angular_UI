import { Component, OnInit , Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api.service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit{

  tableData:any;

  constructor( private dialog:MatDialogRef<DeleteProductComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any,
               private api:ApiServiceService,
               private route:Router
             ) { }

    tokenInput = new FormGroup({
      token: new FormControl('',[Validators.required])
    })

    token = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() 
  {
    this.tableData = this.data.id;
  }

  deleteDevice(id:any) 
  {
    let payload = 
      {
          x : {
            token : this.tokenInput.value.token,
            DevId: id
          }
      }

      this.api.deleteDataFunc(payload.x).pipe(catchError((err)=>{
        return err
      })).subscribe(res=>{
      });

      this.route.navigate(['admin/product-dashboard']);
  }
}
