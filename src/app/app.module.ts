import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import{AppRoutingModule,routingcomponents} from './app-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';

import { LayoutModule } from '@angular/cdk/layout';
import{MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatNativeDateModule,

  } from '@angular/material';
  import {MatTableModule} from '@angular/material/table';
  import {MatDialogModule} from '@angular/material/dialog';
  import {MatDatepickerModule} from '@angular/material/datepicker';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import{HttpClientModule} from '@angular/common/http';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CartComponent } from './billamount/cart/cart.component';
import { ProductdetailComponent } from './billamount/productdetail/productdetail.component';
import { OrderDetailsComponent } from './billamount/order-details/order-details.component';
import { BillRootComponent } from './billamount/bill-root/bill-root.component';
import { OrderlistComponent } from './orders/orderlist/orderlist.component';
import { PrintComponent } from './printpage/print/print.component';
import { MainComponent } from './main/main.component';

import { StoreSelectorComponent } from './store-selector/store-selector.component';

import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { SalesReportComponent } from './sales/sales-report/sales-report.component';
import { SalesReportDetailsComponent } from './sales/sales-report-details/sales-report-details.component';
import { PrintcheckComponent } from './billamount/printcheck/printcheck.component';
import { FlavourAddComponent } from './flavours/flavour-add/flavour-add.component';
import { FlavourListComponent } from './flavours/flavour-list/flavour-list.component';
import { ShopAddComponent } from './shops/shop-add/shop-add.component';
import { ShopListComponent } from './shops/shop-list/shop-list.component';
import { FlavourEditComponent } from './flavours/flavour-edit/flavour-edit.component';
import { ShopEditComponent } from './shops/shop-edit/shop-edit.component';
import { ProductionComponent } from './productions/production/production.component';
import { InproductionComponent } from './productions/inproduction/inproduction.component';
import { AllSalesReportComponent } from './sales/all-sales-report/all-sales-report.component';
import { AllSalesReportEditComponent } from './sales/all-sales-report-edit/all-sales-report-edit.component';
import { InstockComponent } from './productions/instock/instock.component';
import { SalesReportPrintComponent } from './sales/sales-report-print/sales-report-print.component';
import { CancelComponent } from './productions/cancel/cancel.component';
import { CancelOrderComponent } from './productions/cancel-order/cancel-order.component';
import { CancelListComponent } from './productions/cancel-list/cancel-list.component';
import { OrderPrintComponent } from './orders/order-print/order-print.component';



@NgModule({
  declarations: [
    AppComponent,
    routingcomponents,
    ProductComponent,
    ProductListComponent,
    ProductEditComponent,
    CustomerAddComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CartComponent,
    ProductdetailComponent,
    OrderDetailsComponent,
    BillRootComponent,
    OrderlistComponent,
    PrintComponent,
    MainComponent,
    
    StoreSelectorComponent,
    
    OrderEditComponent,
    
    SalesReportComponent,
    
    SalesReportDetailsComponent,
    
    PrintcheckComponent,
    
    FlavourAddComponent,
    
    FlavourListComponent,
    
    ShopAddComponent,
    
    ShopListComponent,
    
    FlavourEditComponent,
    
    ShopEditComponent,
    
    ProductionComponent,
    
    InproductionComponent,
    
    AllSalesReportComponent,
    
    AllSalesReportEditComponent,
    
    InstockComponent,
    
    SalesReportPrintComponent,
    
    CancelComponent,
    
    CancelOrderComponent,
    
    CancelListComponent,
    
    OrderPrintComponent,
    
    
   
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatDatepickerModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ],
  providers: [],
  entryComponents:[AllSalesReportEditComponent,OrderPrintComponent,CancelOrderComponent, CustomerEditComponent,ProductEditComponent,OrderEditComponent,SalesReportDetailsComponent,PrintComponent,PrintcheckComponent,FlavourEditComponent,ShopEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
