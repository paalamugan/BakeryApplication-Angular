import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../../models/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import{Router} from '@angular/router';
import{ActivatedRoute,Params} from '@angular/router';
var input, filter, table, tr, td, i;
@Component({
  selector: 'app-inproduction',
  templateUrl: './inproduction.component.html',
  styleUrls: ['./inproduction.component.css']
})
export class InproductionComponent implements OnInit {
  
  public salesorder: Array<SalesOrder>=[];
  public salesorder1: Array<SalesOrder> =[];
  shop:string;
  edit:string;
  change:string;
  result:Array<SalesOrder> = [];
  public dataSource = new MatTableDataSource<SalesOrder>(this.salesorder);
  selection = new SelectionModel<SalesOrder>(true, []);
   constructor(private salesOrderService: SalesOrderService,private route:ActivatedRoute,private router:Router,private snackBar: MatSnackBar,
   ) { }
  ngOnInit() {
   
    this.shop = this.route.snapshot.params['shop']; 
    this.edit = this.route.snapshot.params['admin'];
    if(this.edit=="anumod"){
      this.change="anumod1";
      this.salesOrderService.getInproductionParam()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesorder = resultData;
        this.result=resultData;
        this.dataSource = new MatTableDataSource(this.salesorder);
      });
    }else{
this.change=this.shop;
      this.salesOrderService.getInproductionParam()
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
  
  onclick(salesorder:SalesOrder){
    const selectvalue =this.selection.isSelected(salesorder);
    if(selectvalue === false){
      this.salesorder1.push(salesorder);
    }else if(selectvalue === true){
      for(var i=0;i<this.salesorder1.length;i++){
        if(this.salesorder1[i]["id"] === salesorder.id){
          this.salesorder1.splice(i,1);
        }
      }
     }
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
    // var input, filter, table, tr, td, i,firstcol,secondcol,ninethcol,seventhcol;
    // input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    // table = document.getElementById("myTab");
    // tr = table.getElementsByTagName("tr");
    // for (i = 0; i < tr.length; i++) {
    //   td = tr[i].getElementsByTagName("td")[1];
    //   secondcol = tr[i].getElementsByTagName("td")[2];
    //   seventhcol = tr[i].getElementsByTagName("td")[7];
    //   ninethcol = tr[i].getElementsByTagName("td")[9];
    //   if (td) {
    //     if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || secondcol.innerHTML.toUpperCase().indexOf(filter) > -1 || seventhcol.innerHTML.toUpperCase().indexOf(filter) > -1 || ninethcol.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = "";
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }       
    // }
}
  onAllClick(){
    const selectAll= this.isAllSelected();
    if(selectAll === false){
      this.salesorder1=this.salesorder;
    }else{
      this.salesorder1 = [];
    }
  }
  onSubmit(){
    if(this.salesorder1.length >0){
      this.salesOrderService.movetoInStock(this.salesorder1)
      .subscribe((resultData:Array<SalesOrder>) => {
      this.router.navigate(['/orderlist',{shop1:this.change}]);
      });
          }else {
            this.snackBar.open("please check atleast one checkbox","", {
              duration: 3000,
            });
          }
    // 
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
