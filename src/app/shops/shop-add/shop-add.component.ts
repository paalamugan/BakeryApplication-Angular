import { Component, OnInit, ViewChild } from '@angular/core';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop.service';
import { MatSnackBar, MatInput } from '@angular/material';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css']
})
export class ShopAddComponent implements OnInit {
  @ViewChild('shopNameInput') shopname: MatInput;
  public shop1:string="";
  public shop: Shop = new Shop(1,"","");
  public shops: Array<Shop> = [];
  constructor(private shopService: ShopService,
    public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.shopService.getShopAll()
      .subscribe((resultData: Array<Shop>) => {
        this.shops = resultData;
      });
    this.shopname.focus();
  }
  onSubmit(){
    this.shops.forEach(element => {

      if(element.shopName == this.shop.shopName){
        this.shop1=element.shopName;
      }
      
    });
    if(this.shop1 == this.shop.shopName){
      this.snackBar.open("ShopName already exist","", {
        duration: 3000,
       });
    }else{
      this.shopService.addShop(this.shop)
      .subscribe((response:Shop) => {
        this.shops.push(response);
        this.snackBar.open("Added Shop Successfully", "Ok", {
          duration: 2000,
        });
      }
      );
    this.shop.shopName ="";
    this.shop.shopCode ="";
    this.shopname.focus();
    }
    
  }
}
