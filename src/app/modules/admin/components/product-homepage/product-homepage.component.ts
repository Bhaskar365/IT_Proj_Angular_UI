import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewProductComponent } from '../view-product/view-product.component';

export interface UserData {
  DevId:number;
  DevType:string;
  Owner:string;
  Location:string;
}

@Component({
  selector: 'app-product-homepage',
  templateUrl: './product-homepage.component.html',
  styleUrls: ['./product-homepage.component.scss'],
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, 
             MatTableModule, MatCardModule,
             MatButtonModule,MatSortModule, MatPaginatorModule,
             MatIconModule,MatDialogModule,CommonModule,
             MatTooltipModule],
})

export class ProductHomepageComponent implements OnInit , AfterViewInit{

  displayedColumns:string[] = ['DevId', 'DevType', 'Owner', 'Location','Edit'];
  dataSource!:MatTableDataSource<UserData>
  inventoryData:any;
  tableData:any;
  isDataLoading = true;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor( private activatedRoute:ActivatedRoute,
               private serv:ApiServiceService,
               private matDialog:MatDialog,
               private router:Router,
             ) 
  {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    
    
    this.serv.getAllDataFunc().subscribe((res:any)=>{
      this.isDataLoading = false;
      this.inventoryData = JSON.parse(res);
      this.dataSource.data = this.inventoryData;
      this.tableData = this.dataSource.data;
    });
  }

  editProduct(id:any){
      // const dialogRef = this.matDialog.open(EditProductComponent,
      //   {
      //     data:{id}
      //   });
      // dialogRef.afterClosed().subscribe(res=>{
      //   // console.log(res.data);
      // });
      this.router.navigate(['admin/edit-product',id]);
  }

  noDataAddNavigate(){
      this.router.navigate(['admin/add-product']);
  }

applyFilter(event:Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}

directToAddPage() {
    this.router.navigate(["admin/add-product"]);
}

viewOnlyDetails(id:any) {

  const dialog = this.matDialog.open(ViewProductComponent,
    {
       data : { id }
    });

    dialog.afterClosed().subscribe(res => {
    });


}

}
