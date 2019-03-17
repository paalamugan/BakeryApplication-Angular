import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { SalesReportDetailsComponent } from '../sales-report-details/sales-report-details.component';
import { SalesOrder } from '../../models/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { OrderStatus } from '../../models/order-status';
import{ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  displayedColumns = ['position', 'name', 'mobile', 'total', 'actionsColumn'];
  
  public salesReport: Array<SalesOrder>=[];
  public dataSource = new MatTableDataSource(this.salesReport);
  shop:string;
  edit:string;
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
      nineth=tr[i].getElementsByTagName("td")[9];
      tenth=tr[i].getElementsByTagName("td")[10];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || nineth.innerHTML.toUpperCase().indexOf(filter) > -1 ||sixthcol.innerHTML.toUpperCase().indexOf(filter) > -1 || tenth.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}
  constructor(private salesOrderService: SalesOrderService,private route:ActivatedRoute,
    private dialog?: MatDialog,
  ) { }
  

  ngOnInit() {
    this.shop = this.route.snapshot.params['shop']; 
    this.edit = this.route.snapshot.params['admin'];
    if(this.edit=="anumod"){
      this.salesOrderService.getAllOrders()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesReport = resultData;
        this.dataSource = new MatTableDataSource(this.salesReport);
      });
    }else{
      this.salesOrderService.getAllOrders()
      .subscribe((resultData: Array<SalesOrder>) => {
        resultData.forEach(element => {
          if(element.shop.shopName== this.shop){
            this.salesReport.push(element);
          }
        });
      });
    }
   

  }


}
