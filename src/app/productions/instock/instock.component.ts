import { Component, OnInit } from '@angular/core';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder } from '../../models/sales-order';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { OrderEditComponent } from '../../orders/order-edit/order-edit.component';
import{ActivatedRoute,Params} from '@angular/router';
var input, filter, table, tr, td, i;
@Component({
  selector: 'app-instock',
  templateUrl: './instock.component.html',
  styleUrls: ['./instock.component.css']
})
export class InstockComponent implements OnInit {
  public salesorder: Array<SalesOrder> =[];
  edit:string;
  public dataSource = new MatTableDataSource(this.salesorder);
  result:Array<SalesOrder> = [];
  constructor( private salesOrderService: SalesOrderService,private route:ActivatedRoute,private dialog?: MatDialog) { }
  shop:string;
  ngOnInit() {
    this.shop = this.route.snapshot.params['shop']; 
    this.edit = this.route.snapshot.params['admin'];
    if(this.edit=="anumod"){
      this.salesOrderService.getInstockParam()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesorder = resultData;
        this.result=resultData;
        this.dataSource = new MatTableDataSource(this.salesorder);
      });
    }else{
      this.salesOrderService.getInstockParam()
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
  editstock(salesOrder: SalesOrder){
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(OrderEditComponent, {
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
      if(element.expectedDate==this.anynumber || element.customid==this.anynumber || element.customer.name==this.anynumber ||element.shop.shopName==this.anynumber){
        this.salesorder.push(element);
     }
    
    });
    if(this.anynumber==""){
      this.salesorder=this.result;
    }
    // var input, filter, table, tr, td, i,firstcol,secondcol,fifthcol,sixthcol,nineth,tenth;
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
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }       
    // }
}
}
