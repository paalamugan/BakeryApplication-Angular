import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../models/product';
import { MatSnackBar, MatDialog } from '@angular/material';
import { OrderItem } from '../../models/order-item';
import { SalesOrder } from '../../models/sales-order';
import { Utils } from '../../utils';
import { SalesOrderService } from '../../services/sales-order.service';
import { PrintComponent } from '../../printpage/print/print.component';
import { PrintcheckComponent } from '../printcheck/printcheck.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() public salesOrder: SalesOrder;
  @Input() public salesOrder1: Array<SalesOrder>=[];
  @Output() onOrder = new EventEmitter<any>();
  @Output() closeBill = new EventEmitter<boolean>();
  showOrderItems:boolean;
  isPopupOpened=true;
  @ViewChild('Order') order: ElementRef;
 @HostListener('document:keyup', ['$event'])
  keyup(event: KeyboardEvent): void {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ( event.altKey && charCode === 79) {
      event.preventDefault();
     this.onOrderClick();
    }else if(event.altKey && charCode === 67){
      event.preventDefault();
      this.onCheckOut();
    }
  }
  
  constructor(private router:Router,private snackBar: MatSnackBar,
    private salesOrderService: SalesOrderService, private dialog?: MatDialog) { }

  ngOnInit() {
    if (this.salesOrder.orderItems != null) {
        this.showOrderItems = true;
    
    }
    else{
      this.showOrderItems=false;
    }
  }


  onOrderClick() {
    if(this.salesOrder.orderItems.length > 0){
      this.onOrder.emit(this.salesOrder);
    }else{
      this.snackBar.open("No Item to Order","", {
        duration: 3000,
      });
    }
   

  }
  // deleteitem(orderItem:OrderItem){
  //   for(var i=0; i<this.salesOrder.orderItems.length;i++){
  //     if(this.salesOrder.orderItems[i]["id"] === orderItem.id){
  //       this.salesOrder.orderItems.splice(i,1);
  //     }
  //   }
  // }
  onCheckOut() {
    if(this.salesOrder.orderItems.length > 0){
      this.salesOrder.orderStatus=Utils.getOrderStatus(Utils.DELIVERED);
      this.salesOrder.customer = null;
       this.salesOrderService.addSalesOrderNew(this.salesOrder)
         .subscribe((response: SalesOrder) => {
           this.isPopupOpened = true;
           const dialogRef = this.dialog.open(PrintcheckComponent, {
             data: response
           });
   
   
           dialogRef.afterClosed().subscribe(result => {
             this.isPopupOpened = false;
            
           });
   
           this.closeBill.emit(false);
           this.snackBar.open("Billed Successfully", "Ok", {
             duration: 2000,
           });
         });
       
    }else{
      this.snackBar.open("No Item to Checkout","", {
        duration: 3000,
      });
    }
    
  }
}
