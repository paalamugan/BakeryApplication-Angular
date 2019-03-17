import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalesOrder } from '../../models/sales-order';
import { MatTableDataSource, MatDialog } from '../../../../node_modules/@angular/material';
import { SalesOrderService } from '../../services/sales-order.service';
import{ActivatedRoute,Params} from '@angular/router';
import { SalesReportDetailsComponent } from '../../sales/sales-report-details/sales-report-details.component';


@Component({
  selector: 'app-cancel-list',
  templateUrl: './cancel-list.component.html',
  styleUrls: ['./cancel-list.component.css']
})
export class CancelListComponent implements OnInit {
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
      this.salesOrderService.getCancelParam()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesReport = resultData;
        this.dataSource = new MatTableDataSource(this.salesReport);
      });
    }else{
      this.salesOrderService.getCancelParam()
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
    var input, filter, table, tr, td, i,firstcol,secondcol,fourthcol,sixthcol,seventh;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      firstcol = tr[i].getElementsByTagName("td")[1];
      fourthcol=tr[i].getElementsByTagName("td")[4];
      sixthcol=tr[i].getElementsByTagName("td")[6];
      seventh=tr[i].getElementsByTagName("td")[7];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || fourthcol.innerHTML.toUpperCase().indexOf(filter) > -1 || seventh.innerHTML.toUpperCase().indexOf(filter) > -1 ||sixthcol.innerHTML.toUpperCase().indexOf(filter) > -1) {
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

}
