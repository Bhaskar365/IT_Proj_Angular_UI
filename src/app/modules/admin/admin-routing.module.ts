import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { ProductHomepageComponent } from './components/product-homepage/product-homepage.component';
const routes: Routes = [
  { path: '', component: HeaderComponent, 
    children:[
      { path: 'product-homepage', component: ProductHomepageComponent },
      { path: 'product-dashboard', component: ProductDashboardComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product', component: EditProductComponent },
      { path: '' , redirectTo:'/admin/product-homepage', pathMatch:'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
