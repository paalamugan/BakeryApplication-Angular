import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { BillRootComponent } from './billamount/bill-root/bill-root.component';
import { OrderlistComponent } from './orders/orderlist/orderlist.component';
import { PrintComponent } from './printpage/print/print.component';
import { SalesReportComponent } from './sales/sales-report/sales-report.component';
import { MainComponent } from './main/main.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FlavourAddComponent } from './flavours/flavour-add/flavour-add.component';
import { FlavourListComponent } from './flavours/flavour-list/flavour-list.component';
import { ShopAddComponent } from './shops/shop-add/shop-add.component';
import { ShopListComponent } from './shops/shop-list/shop-list.component';
import { ProductionComponent } from './productions/production/production.component';
import { InproductionComponent } from './productions/inproduction/inproduction.component';
import { AllSalesReportComponent } from './sales/all-sales-report/all-sales-report.component';
import { InstockComponent } from './productions/instock/instock.component';
import { SalesReportPrintComponent } from './sales/sales-report-print/sales-report-print.component';
import { CancelComponent } from './productions/cancel/cancel.component';
import { CancelListComponent } from './productions/cancel-list/cancel-list.component';




const routes: Routes = [
    {
        path: '', redirectTo:'', pathMatch:'full'
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'product-list',
        component: ProductListComponent
    },
    // {
    //     path: 'product-list/:_id',
    //     component: ProductEditComponent
    // },
    {
        path: 'customer-add',
        component: CustomerAddComponent
    },
    {
        path: 'customer-list',
        component: CustomerListComponent
    },
    {
        path: 'bill',
        component: BillRootComponent
    },
    {
        path: 'orderlist',
        component: OrderlistComponent
    },
    {
        path: 'orderlist/:admin',
        component: OrderlistComponent
    },
   
    {
        path: 'sales-report',
        component: SalesReportComponent
    },
    {
        path:'delivery-report',
        component:SalesReportPrintComponent
    },
    {
        path: 'flavour-add',
        component: FlavourAddComponent
    },
    {
        path: 'flavour-list',
        component: FlavourListComponent
    },
    {
        path: 'shops-add',
        component: ShopAddComponent
    },
    {
        path: 'shops-list',
        component: ShopListComponent
    },
    {
        path:'pendinglist',
        component:ProductionComponent
    },
    {
        path:'Inproductionlist',
        component:InproductionComponent
    },
    {
        path:'Instocklist',
        component:InstockComponent
    },
    {
        path:'Orderslist',
        component:CancelComponent
    },
    {
        path:'Cancellist',
        component:CancelListComponent
    },
   
    {
        path:'All-Sales-Report',
        component:AllSalesReportComponent
    },
   
    {
        path:"**",
        component:PageNotFoundComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [PageNotFoundComponent,AppComponent
]