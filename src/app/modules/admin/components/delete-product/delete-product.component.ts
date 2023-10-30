import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, BehaviorSubject } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { note_Add_Interface } from '../models/userModel';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  tableData: any;
  notesBoxActive: boolean = true;
  userName!: string;
  deleteNote!:note_Add_Interface

  constructor(private dialog: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiServiceService,
    private route: Router
  ) { }

  jwtHelperService = new JwtHelperService();

  tokenInput = new FormGroup({
    token: new FormControl('', [Validators.required])
  });

  //add notes for delete
  deletedProductNote = new FormGroup({
    Note: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.tableData = this.data.id;

    //user info
    let token = localStorage.getItem('access_token');
    let userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    let userTokenData = userInfo;
    this.userName = userTokenData.firstname + " " + userTokenData.lastname;
  }

  deleteDevice(id: any) {
    let payload =
    {
      x: {
        token: this.tokenInput.value.token,
        DevId: id
      }
    }

    this.api.deleteDataFunc(payload.x).pipe(catchError((err) => {
      return err
    })).subscribe(res => {
      console.log(res)
    });

    this.deleteNotesFunction();
    // window.location.reload();
  }

  deleteNotesFunction() {

    this.deleteNote = {
      token: this.tokenInput.value.token,
      DevId : this.tableData.DevId,
      Note : this.deletedProductNote.value.Note,
      AddBy : this.userName
    };
    console.log(this.deleteNote);

    this.api.addNoteAPI(this.deleteNote).subscribe(res=>{
      let x = JSON.stringify(res);
      console.log(x);
    })

  }
}
