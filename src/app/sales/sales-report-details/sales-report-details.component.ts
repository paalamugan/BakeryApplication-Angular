import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../models/product';
import { SalesOrder } from '../../models/sales-order';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'app-sales-report-details',
  templateUrl: './sales-report-details.component.html',
  styleUrls: ['./sales-report-details.component.css']
})
export class SalesReportDetailsComponent implements OnInit {
  displayedColumns = ['id', 'name', 'quantity', 'price', 'total'];
  dataSource: MatTableDataSource<OrderItem>;
  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SalesReportDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrder
  ) {
    this.dataSource = new MatTableDataSource<OrderItem>(this.data.orderItems);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }



  ngOnInit() {
  }

}
