import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ShopEditComponent>, private shopService: ShopService,

    @Inject(MAT_DIALOG_DATA) public data: Shop) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
  onSubmit() {
    this.shopService.editShop(this.data)
      .subscribe(() => {
        this.dialogRef.close();
     });

  }
}
