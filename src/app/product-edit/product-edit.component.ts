import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {



  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductEditComponent>, private productService: ProductService,

    @Inject(MAT_DIALOG_DATA) public data: Product) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {


  }
  onSubmit() {
    this.productService.editProduct(this.data)
      .subscribe(() => {
        this.dialogRef.close();
     });

  }
}
