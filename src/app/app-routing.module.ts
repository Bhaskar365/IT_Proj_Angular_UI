import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './External_components/login/login.component';
import { NotFoundComponent } from './External_components/not-found/not-found.component';
import { SignUpComponent } from './External_components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: 'login', component:LoginComponent },
  
  { path: 'sign-up', component: SignUpComponent },
  { path: '', redirectTo:'/login', pathMatch:'full' },
  { path: 'admin', 
    canActivate:[AuthGuard],
      loadChildren:()=> 
      import('./modules/admin/admin.module').then(m=>m.AdminModule) },
  { path: '**', component: NotFoundComponent },
  { path: 'not-found', component: NotFoundComponent }  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
