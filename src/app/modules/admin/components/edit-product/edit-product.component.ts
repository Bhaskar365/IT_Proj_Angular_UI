import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{

  userId:any;
  userData:any;

  constructor( private activatedRoute:ActivatedRoute, private serv:ApiServiceService ){}

    ngOnInit(){

        this.activatedRoute.paramMap.subscribe((params:any)=>{
            this.userId = params.get('userId');
            // console.log(this.userId)
            this.userId = JSON.parse(this.userId)          
        });
         this.getIdDetails(this.userId);
    }

    getIdDetails(id:any){
            // console.log(id);
            this.serv.getDataById(id).pipe(catchError((err)=>
              {
                return err
              })).subscribe((res:any)=>{
            this.userData = res;
            // console.log(res);
        });
    }
     

}
