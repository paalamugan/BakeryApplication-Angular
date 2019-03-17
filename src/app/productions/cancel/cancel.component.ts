import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalesOrder } from '../../models/sales-order';
import { MatTableDataSource, MatDialog } from '../../../../node_modules/@angular/material';
import { SalesOrderService } from '../../services/sales-order.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { CancelOrderComponent } from '../cancel-order/cancel-order.component';
import { PrintComponent } from '../../printpage/print/print.component';
import { OrderPrintComponent } from '../../orders/order-print/order-print.component';
var input, filter, table, tr, td, i;
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
  public salesorder: Array<SalesOrder> =[];
  edit:string;
  public dataSource = new MatTableDataSource(this.salesorder);
  constructor( private salesOrderService: SalesOrderService,private route:ActivatedRoute,private dialog?: MatDialog) { }
  shop:string;
  result:Array<SalesOrder> = [];
  ngOnInit() {
    this.shop = this.route.snapshot.params['shop']; 
    this.edit = this.route.snapshot.params['admin'];
    
    if(this.edit=="anumod"){
      this.salesOrderService.getOrders()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesorder = resultData;
        this.result=this.salesorder;
        this.dataSource = new MatTableDataSource(this.salesorder);
      });
    }else{
      this.salesOrderService.getOrders()
      .subscribe((resultData: Array<SalesOrder>) => {
        resultData.forEach(element => {
          if(element.shop.shopName== this.shop){
            this.salesorder.push(element);
            this.result.push(element);
          }
        });
      });
    }
   
    }
  isPopupOpened = true;
  editcancel(salesOrder: SalesOrder){
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(CancelOrderComponent, {
      data: salesOrder
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
  Print(salesOrder: SalesOrder){
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(OrderPrintComponent, {
      data: salesOrder
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });

  }
  anynumber:any;
  applyFilter(){
    this.salesorder=[];
    this.result.forEach(element => {
      if(element.expectedDate==this.anynumber || element.customid==this.anynumber || element.customer.name==this.anynumber || element.orderStatus.name==this.anynumber ||element.shop.shopName==this.anynumber){
        this.salesorder.push(element);
     }
    
    });
    if(this.anynumber==""){
      this.salesorder=this.result;
    }
    // var input, filter, table, tr, td, i,firstcol,fifthcol,sixthcol,nineth,tenth;
    // input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    // table = document.getElementById("myTab");
    // tr = table.getElementsByTagName("tr");
    // for (i = 0; i < tr.length; i++) {
    //   td = tr[i].getElementsByTagName("td")[1];
    //   firstcol = tr[i].getElementsByTagName("td")[2];
    //   sixthcol=tr[i].getElementsByTagName("td")[7];
    //   nineth=tr[i].getElementsByTagName("td")[10];
    //   tenth=tr[i].getElementsByTagName("td")[11];
    //   if (td) {
    //     if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || nineth.innerHTML.toUpperCase().indexOf(filter) > -1 ||sixthcol.innerHTML.toUpperCase().indexOf(filter) > -1 ||tenth.innerHTML.toUpperCase().indexOf(filter) > -1 ) {
    //       tr[i].style.display = "";
        
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }       
    // }
}
@ViewChild('printsection') printsection: ElementRef;
today: number = Date.now();
printorder():void{
    
    let printContents, popupWin;
  
    printContents = document.getElementById('printsection').innerHTML;
    popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
       
          <style>
          html, body {
          
            display: block; 
            font-family: "Calibri";
            margin: 0px;
            font-size:auto;
          }
        table{
          width: 100%;
            max-width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
        }
        #myTab{
          font-size: 13px;
          background-color: white;
    
        }
        table, td, th {
          border-bottom: 1px solid black;
          border-top: 1px solid black;
      }
      
      th {
          text-align: left;
      }
        #myTab th,#mytab td{
          text-align: left;
          font-size: 14px;
          padding: 12px;
        }
        
        
       
        
     .display_1{
       display:none;
     }
  
  .center{
    text-align:center;
    text-transform: uppercase;
  }

          </style>
        </head>
    <body onload="window.print();window.close()"> ${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  } 
}
