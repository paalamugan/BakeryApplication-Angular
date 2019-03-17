import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SalesOrder } from '../../models/sales-order';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { SalesOrderService } from '../../services/sales-order.service';
import { AllSalesReportEditComponent } from '../all-sales-report-edit/all-sales-report-edit.component';
import{ActivatedRoute,Params} from '@angular/router';
import { OrderStatus } from '../../models/order-status';
import { Utils } from '../../utils';
@Component({
  selector: 'app-all-sales-report',
  templateUrl: './all-sales-report.component.html',
  styleUrls: ['./all-sales-report.component.css']
})
export class AllSalesReportComponent implements OnInit {
  edit:string;
  custom:boolean;
  public orderStatuses: OrderStatus;
  displayedColumns = ['id', 'customer', 'mobile', 'advance', 'total', 'orderedDate', 'expectedDate', 'orderedTime', 'expectedTime', 'orderStatus', 'shop', 'actioncolumn'];
  public salesorder: Array<SalesOrder> = [];
  public dataSource = new MatTableDataSource(this.salesorder);
  constructor(  public snackBar: MatSnackBar,private salesorderservice: SalesOrderService, private route:ActivatedRoute, private dialog?: MatDialog) { }
  applyFilter(){
    var input, filter, table, tr, td, i,firstcol,fifthcol,sixthcol,nineth,tenth;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTab");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      firstcol = tr[i].getElementsByTagName("td")[1];
      sixthcol=tr[i].getElementsByTagName("td")[5];
      nineth=tr[i].getElementsByTagName("td")[7];
      tenth=tr[i].getElementsByTagName("td")[8];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || nineth.innerHTML.toUpperCase().indexOf(filter) > -1 ||sixthcol.innerHTML.toUpperCase().indexOf(filter) > -1 || tenth.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}


  ngOnInit() {
    this.edit = this.route.snapshot.params['admin'];
    if(this.edit=="anumod"){
      this.custom=false;
    }else{
this.custom = true;
    }
    this.salesorderservice.getAllOrders()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesorder = resultData;
        this.dataSource = new MatTableDataSource(this.salesorder);
      });
     // this.orderStatuses = Utils.getOrderStatus("Cancelled") ;
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
  deleteorder(salesOrder: SalesOrder){
  if(confirm('Are you sure to delete this order ?') == true && salesOrder.orderStatus.name == 'Cancelled' ){
    this.salesorderservice.deleteSalesorder(salesOrder)
    .subscribe((response) => {
 this.salesorder.splice(this.salesorder.indexOf(salesOrder),1);
    },(err)=>{
      console.log(err);
    });
  }else{
    this.snackBar.open("Only Cancelled Order should be deleted","", {
      duration: 3000,
     });
  }
    
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
