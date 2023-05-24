import { Component, EventEmitter, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(private authServ:ApiServiceService,private router:Router) {}

  @Output() menuClicked = new EventEmitter<boolean>();
  showFiller = false;


  logOut(){
    
    this.authServ.removeToken();
    this.router.navigateByUrl('/login');

  }

}
