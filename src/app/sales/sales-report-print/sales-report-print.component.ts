import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalesOrder } from '../../models/sales-order';
import { MatTableDataSource, MatDialog } from '../../../../node_modules/@angular/material';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesReportDetailsComponent } from '../sales-report-details/sales-report-details.component';
import{ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-sales-report-print',
  templateUrl: './sales-report-print.component.html',
  styleUrls: ['./sales-report-print.component.css']
})
export class SalesReportPrintComponent implements OnInit {
  public salesReport: Array<SalesOrder> = [];
  shop:string;
  edit:string;
  public dataSource = new MatTableDataSource(this.salesReport);
  constructor(private salesOrderService: SalesOrderService,private route:ActivatedRoute,
    private dialog?: MatDialog,
  ) { }

  ngOnInit() {
    this.shop = this.route.snapshot.params['shop'];
    this.edit = this.route.snapshot.params['admin'];
    if(this.edit=="anumod"){
      this.salesOrderService.getSalesReport()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesReport = resultData;
        this.dataSource = new MatTableDataSource(this.salesReport);
      });
    }else{
      this.salesOrderService.getSalesReport()
      .subscribe((resultData: Array<SalesOrder>) => {
        resultData.forEach(element => {
          if(element.shop.shopName== this.shop){
            this.salesReport.push(element);
          }
        });
      });
    }
   
  }
  applyFilter(){
    var input, filter, table, tr, td, i,firstcol,fourthcol,seventh;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      firstcol = tr[i].getElementsByTagName("td")[1];
      fourthcol = tr[i].getElementsByTagName("td")[4];
      seventh=tr[i].getElementsByTagName("td")[7];
     
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || fourthcol.innerHTML.toUpperCase().indexOf(filter) > -1 || seventh.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}
isPopupOpened = true;

salesshow(salesOrder: SalesOrder) {
  this.isPopupOpened = true;

  const dialogRef = this.dialog.open(SalesReportDetailsComponent, {
    data: salesOrder
  });


  dialogRef.afterClosed().subscribe(result => {
    this.isPopupOpened = false;
  });
}
@ViewChild('printsection') printsection: ElementRef;
today: number = Date.now();
onSubmit():void{
    
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
        #table{
          width: 100%;
            max-width: 100%;
            margin-bottom: 20px;
        }
        #myTable td, #myTable th{
          table-layout: fixed;
          width: 150px;
          overflow: hidden; 
          word-wrap: break-word;
        }
      
        table{
          width: 100%;
            max-width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
        }
        #myTable th, #myTable td {
          text-align: left;
          padding: 12px;
          font-size: 14px;
        }
        .report-none{
          display: block;
      }
      table, td, th {
        border-bottom: 1px solid black;
        border-top: 1px solid black;
    }
  .report-none1{
    display: none;
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
