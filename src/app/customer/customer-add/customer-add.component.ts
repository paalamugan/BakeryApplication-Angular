import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatInput, MatSnackBar } from '@angular/material';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
 
  @ViewChild('customerNameInput') customerName: MatInput;
  public customer1:string="";
  public customers: Array<Customer> = [];
  public customer: Customer
    = new Customer( -1, "", "", '');
   

  constructor(private customerservice:CustomerService,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.customerservice.getAll()
    .subscribe((resultData: Array<Customer>) => {
      
      this.customers = resultData;
    });
    this.customerName.focus();

  } 
  onSubmit() {
    this.customers.forEach(element => {

      if(element.mobile == this.customer.mobile){
        this.customer1=element.mobile;
      }
      
    });
    if(this.customer1 == this.customer.mobile){
      this.snackBar.open("Cunstomer Name already exist","", {
        duration: 3000,
       });
    }else{
    this.customerservice.addCustomer(this.customer)
      .subscribe((response) => {
        this.snackBar.open("Added Customer Successfully", "Ok", {
          duration: 2000,
        });
      }
      );
    this.customer.name = "";
    this.customer.mobile = "";
    this.customer.alternateMobile = "";
    this.customerName.focus();

  }
  }
}
