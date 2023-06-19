import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  name!:string;

  constructor(public api:ApiServiceService,private router:Router) {}

  @Output() menuClicked = new EventEmitter<boolean>();
  showFiller = false;

  logOut(){
    
    this.api.removeToken();
    this.router.navigateByUrl('/login');

  }

  homeRouter(){
    this.router.navigate(["admin/product-homepage"]);
  }

}
