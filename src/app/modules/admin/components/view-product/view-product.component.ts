import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit{

  x:any;
  fileName:any;

  constructor( private dialog:MatDialogRef<ViewProductComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any
             ) { }

  ngOnInit(): void {
    
    this.x = this.data.id;
    console.log(this.x)
  }

  closeDialog(){
    this.dialog.close();
  }

  excelExport() {
    
      if (!this.x) {
        console.error('No data available for Excel generation.');
        return;
      }
    
      
      const dataForExport = [this.x]; // Convert the single object into an array
    
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExport);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      this.fileName = 'excel1.xlsx'; // Set the desired file name
      XLSX.writeFile(wb, this.fileName);
  }

}
