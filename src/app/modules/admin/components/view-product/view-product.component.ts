import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit{

  x:any;

  constructor( private dialog:MatDialogRef<ViewProductComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any
             ) { }

  ngOnInit(): void {
    
    this.x = this.data.id;
    console.log(this.x);
  }

}
