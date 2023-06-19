import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute} from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, 
    MatButtonModule,MatSortModule, MatPaginatorModule,MatIconModule],
})

export class ProductHomepageComponent implements OnInit , AfterViewInit{

  displayedColumns:string[] = ['DevId', 'DevType', 'Owner', 'Location','Edit'];
  dataSource!:MatTableDataSource<UserData>
  inventoryData:any;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private activatedRoute:ActivatedRoute,private serv:ApiServiceService) 
  {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    
    this.serv.getAllDataFunc().subscribe((res:any)=>{
      this.inventoryData = JSON.parse(res);
      this.dataSource.data = this.inventoryData;
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
