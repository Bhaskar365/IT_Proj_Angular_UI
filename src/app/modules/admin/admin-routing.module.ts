import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { ProductHomepageComponent } from './components/product-homepage/product-homepage.component';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { PieGraphComponent } from './components/pie-graph/pie-graph.component';
import { ErrorCompComponent } from './components/error-comp/error-comp.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
const routes: Routes = [
  { path: '', component: HeaderComponent, 
    children:[
      { path: 'product-homepage', component: ProductHomepageComponent },
      { path: 'product-dashboard', component: ProductDashboardComponent },
      { path: 'bar-graph', component: BarGraphComponent },
      { path: 'pie-graph', component: PieGraphComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product/:userId', component: EditProductComponent },
      { path: 'view-product', component:ViewProductComponent },
      { path: 'error', component: ErrorCompComponent},
      { path: '' , redirectTo:'product-homepage', pathMatch:'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
