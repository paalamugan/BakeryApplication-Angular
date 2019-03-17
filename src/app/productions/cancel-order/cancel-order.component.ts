import { Component, OnInit, Inject } from '@angular/core';

import { OrderStatus } from '../../models/order-status';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder } from '../../models/sales-order';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Utils } from '../../utils';
@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit {
  public productForm: FormGroup;
  public orderStatuses: OrderStatus;

  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CancelOrderComponent>,
    private salesOrderService: SalesOrderService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrder
  ) {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

balance:number;
  ngOnInit() {
    this.orderStatuses = Utils.getOrderStatus("Cancelled") ;
this.balance=this.data.total - this.data.advance;
  }

  onSubmit() {
  this.data.orderStatus = this.orderStatuses;
    this.salesOrderService.editSalesOrder(this.data)
      .subscribe((response) => {
        this.dialogRef.close();
      });
  }

}
