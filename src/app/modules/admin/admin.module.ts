import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductHomepageComponent } from './components/product-homepage/product-homepage.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { PieGraphComponent } from './components/pie-graph/pie-graph.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatSelectModule } from '@angular/material/select';
import { ErrorCompComponent } from './components/error-comp/error-comp.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ProductDashboardComponent,
    HeaderComponent,
    FooterComponent,
    EditProductComponent,
    SideNavComponent,
    BarGraphComponent,
    PieGraphComponent,
    ErrorCompComponent,
    ViewProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ProductHomepageComponent,
    MatButtonModule,
    MatCardModule,
    AddProductComponent,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
