import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Data } from '@angular/router';
import { SalesOrder } from '../../models/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { OrderEditComponent } from '../order-edit/order-edit.component';
import { AllSalesReportEditComponent } from '../../sales/all-sales-report-edit/all-sales-report-edit.component';
import{ActivatedRoute,Params} from '@angular/router';
import { OrderPrintComponent } from '../order-print/order-print.component';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  public salesorder: Array<SalesOrder> = [];
  
  public dataSource = new MatTableDataSource(this.salesorder);
  constructor(private salesorderservice: SalesOrderService,private route:ActivatedRoute, private dialog?: MatDialog) { }
  edit:string;
  custom:boolean;
  shop:string;
  shop1:string;
  shop2:string;

  result:Array<SalesOrder> = [];
  
  ngOnInit() {
  
    this.edit = this.route.snapshot.params['admin'];
    this.shop = this.route.snapshot.params['shop'];
    this.shop1 = this.route.snapshot.params['shop1'];
  
    if((this.edit=="anumod") || (this.shop1 =="anumod1")){
      this.custom=false;
      this.salesorderservice.getOrders()
                  .subscribe((resultData: Array<SalesOrder>) => {
                    this.salesorder = resultData;
                    this.result=this.salesorder;
            this.dataSource = new MatTableDataSource(this.salesorder);
                   });
    
          }else{
                  if(this.shop1 !="anumod1"){
                      this.custom = true;
                      this.salesorderservice.getOrders()
                        .subscribe((resultData: Array<SalesOrder>) => {
                          resultData.forEach(element => {
                            if(element.shop.shopName== this.shop1){
                              this.salesorder.push(element);
                              this.result.push(element);
                            }
                                     });
                      
                           
                          });
                    }
                    this.custom = true;
                      this.salesorderservice.getOrders()
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
  editorder(salesOrder: SalesOrder) {
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(AllSalesReportEditComponent, {
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
   
    // var input, filter, table, tr, td, i,firstcol,secondcol,fifthcol,sixthcol,nineth,tenth;
    // var a=0;
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
    //     if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || nineth.innerHTML.toUpperCase().indexOf(filter) > -1 ||sixthcol.innerHTML.toUpperCase().indexOf(filter) > -1 || tenth.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = "";
    //      a=a+1;
    //      this.index1=a;
    //      console.log(a);
    //     // this.index.push(a);
        
    //      // console.log(this.index);
    //     }
    //      else {
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
