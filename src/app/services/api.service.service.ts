import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError,map } from 'rxjs';

interface Device_Data {
  data : string;
  msg : string;
  total : string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService 
{
  constructor(private http:HttpClient,private router:Router) { }

  //////////////////INVENTORY API////////////////////////////
  getAllDataFunc()
  {
    return this.http.post<any>("https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Device_GetAll",
    { token:"A12F7A58-842D-4111-A44D-5F8C4E1AA521" }).pipe(catchError((err:any)=>{
      this.router.navigate(['/error']);
      return err;
    }),map(((res:Device_Data)=>{
      return res.data;
    })));
  }

  /////////////---WEB API LOGIN/REGISTER FUNCTION CALLS STARTS---///////////////
  baseUrl = "https://localhost:7269/api/Users/";

  currentUser:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  jwtHelperService = new JwtHelperService();

  createAccount(user:Array<String|null|undefined>) {

      return this.http.post(
          this.baseUrl + 'CreateUser',
          {
            FirstName:user[0],
            LastName:user[1],
            Email:user[2],
            Mobile:user[3],
            Gender:user[4],
            Pwd:user[5]
          },
          {  responseType: 'text' }
          );
  }

  login(loginInfo:any){
    
    let params = new HttpParams()
      .append('email',loginInfo.Email)
      .append('password',loginInfo.Pwd);

      return this.http.get(this.baseUrl + 'LoginUser', {
        params:params,
        responseType: 'text',
      });
  }

   setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
      const token = localStorage.getItem('access_token');
      const userInfo = token != null ? this.jwtHelperService.decodeToken(token):null;
  
      const data = userInfo ? {
        id:userInfo.id,
        firstname : userInfo.firstname,
        lastname : userInfo.lastname,
        email: userInfo.email,
        mobile: userInfo.mobile,
        gender: userInfo.gender
      } : null
      this.currentUser.next(data);
    }

  isLoggedIn():boolean{
      return localStorage.getItem("access_token")? true : false;
    }

  removeToken(){
    localStorage.removeItem('access_token');
  }  

  loginUser(loginInfo:Array<String|null|undefined>){
      return this.http.post(this.baseUrl + 'LoginUser', {
        Email: loginInfo[0],
        Pwd: loginInfo[1]
      },
      { responseType : 'text' }
      );
  }
    /////////////---WEB API LOGIN/REGISTER FUNCTION CALLS ENDS---///////////////
}