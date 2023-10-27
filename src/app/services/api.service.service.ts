import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject, catchError,map } from 'rxjs';
import { note_Add_Interface, note_Del_Interface, note_Get_Interface, note_Upd_Interface } from '../modules/admin/components/models/userModel';

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

  sub$:Subject<any> = new Subject<any>();

  //////////////////INVENTORY API////////////////////////////

    getAllDataUrl = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Device_GetAll";
       addDataUrl = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Device_Add";
  getUserDataById = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Device_Get";
  updateDeviceURL = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Device_Upd";
  deleteDeviceURL = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Device_Del";
      
      note_AddURL = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Note_Add";
      note_DelURL = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Note_Del";
      note_GetURL = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Note_Get";
      note_UpdURL = "https://tools.brandinstitute.com/wsInventory/wsInventory.asmx/Note_Upd";

  getAllDataFunc()
  {
    return this.http.post<any>(`${this.getAllDataUrl}`,
    { token:"A12F7A58-842D-4111-A44D-5F8C4E1AA521" }).pipe(catchError((err:any)=>{
      this.router.navigate(['/error']);
      return err;
    }),map(((res:Device_Data)=>{
      return res.data;
    })));
  }

  addDataFunc(data:any)
  {
      return this.http.post<any>(`${this.addDataUrl}`,data).pipe(catchError((err)=>{
        return err;
      }), map(((res:any)=>{
        return JSON.stringify(res);
      })));
  }

   getDataById(id:any){
      return this.http.post<any>(`${this.getDataById}`,
      { token:"A12F7A58-842D-4111-A44D-5F8C4E1AA521", DevId: id}
      ).pipe(catchError((err)=>{
        return err;
      }),
      map((res:Device_Data)=>{
        return res.data;
      }));
  }

  updateDataFunc(updateData:any)
  {
    return this.http.post<any>(`${this.updateDeviceURL}`,updateData).pipe(catchError((err)=>{
      return err;
    }),map((res:any)=>{
      console.log('inside serv class');
      return JSON.stringify(res);
    }))
  }

  deleteDataFunc(id:any)
  {
      return this.http.post<any>(`${this.deleteDeviceURL}`,id).pipe(catchError((err)=>{
        return err;
      }),map((res:any)=>{
        return res;
      }))
  }

  // Add Note API
  addNoteAPI(data:note_Add_Interface) {
    return this.http.post<any>(`${this.note_AddURL}`,data).pipe(catchError((err)=>{
      return err;
    }),map((res:any)=>{
      return res;
    }))
  }

  // Delete Note API
  deleteNoteAPI(data:note_Del_Interface) {
    return this.http.post<any>(`${this.note_DelURL}`,data).pipe(catchError((err)=>{
      return err
    }),map((res:any)=>{
      return res;
    }))
  }

  //Get Note API
  getNoteAPI(data:note_Get_Interface){
      return this.http.post<any>(`${this.note_GetURL}`,data).pipe(catchError((err:any)=>{
        return err
      }),map((res:any)=>{
        return res;
      }))
  }

  //Update Note API
  updateNoteAPI(data:note_Upd_Interface){
    return this.http.post<any>(`${this.note_UpdURL}`,data).pipe(catchError((err:any)=>{
      return err
    }),map((res:any)=>{
      return res;
    }))
  }


  /////////////---WEB API LOGIN/REGISTER FUNCTION CALLS STARTS---///////////////
  baseUrl = "https://localhost:7053/api/User/";

  currentUser:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  jwtHelperService = new JwtHelperService();

  createAccount(user:Array<String|null|undefined>) {

      return this.http.post( this.baseUrl + 'Create',
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

  // login(loginInfo:any){
    
  //   let params = new HttpParams()
  //     .append('email',loginInfo.Email)
  //     .append('password',loginInfo.Pwd);

  //     return this.http.get(this.baseUrl + 'LoginUser', {
  //       params:params,
  //       responseType: 'text',
  //     });
  // }

   setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
      const token = localStorage.getItem('access_token');
      const userInfo = token != null ? this.jwtHelperService.decodeToken(token):null;

      let data = userInfo ? {
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
