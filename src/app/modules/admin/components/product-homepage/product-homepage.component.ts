import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service.service';

export interface UserData {

  DevId:number;
  DevType:string;
  Owner:string;
  Location:string;
}

@Component({
  selector: 'app-product-homepage',
  templateUrl: './product-homepage.component.html',
  styleUrls: ['./product-homepage.component.scss']
})
export class ProductHomepageComponent implements OnInit {

  displayedColumns:string[] = ['DevId', 'DevType', 'Owner', 'Location'];
  dataSource!:MatTableDataSource<UserData>
  inventoryData:any;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private activatedRoute:ActivatedRoute,private serv:ApiServiceService) {
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    this.serv.getAllDataFunc().subscribe((res:any)=>{
      this.inventoryData = JSON.parse(res);
      this.dataSource.data = this.inventoryData;
      console.log(this.inventoryData);
    });
  }

applyFilter(event:Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}
}
