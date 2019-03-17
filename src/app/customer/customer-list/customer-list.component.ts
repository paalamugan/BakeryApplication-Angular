import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import{ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  isPopupOpened = true;
  displayedColumns = ['id', 'name', 'mobile','amobile','actioncolumn'];
  @Input() public selectedCustomer:Customer;
  public customers: Array<Customer> = [];
  edit:string;
custom:boolean;
  public dataSource = new MatTableDataSource(this.customers);

  
  constructor( private customerservice:CustomerService, private route:ActivatedRoute, private dialog?: MatDialog) { }
  
  applyFilter(){
    var input, filter, table, tr, td, i,firstcol,fourthcol,seventh;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      firstcol = tr[i].getElementsByTagName("td")[1];
      fourthcol = tr[i].getElementsByTagName("td")[2];
     
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || fourthcol.innerHTML.toUpperCase().indexOf(filter) > -1) {
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
    this.customerservice.getAll()
      .subscribe((resultData: Array<Customer>) => {
        
        this.customers = resultData;
        this.dataSource = new MatTableDataSource(this.customers);
      });
  }
  editcustomer(customer:Customer) {
    this.isPopupOpened = true;
  
    const dialogRef = this.dialog.open(CustomerEditComponent, {
     data:customer
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

}
