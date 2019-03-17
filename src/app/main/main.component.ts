import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Shop } from '../models/shop';
import { Utils } from '../utils';
import { MatDialog } from '@angular/material';
import { StoreSelectorComponent } from '../store-selector/store-selector.component';
import { SalesOrderService } from '../services/sales-order.service';
import { OrderStatus } from '../models/order-status';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  title ='anumod bakery'
  public hasLoggedIn: boolean = true;
  public Admin: boolean;
  private shop: Shop;
  constructor(public dialog: MatDialog,
    private salesOrderService: SalesOrderService) { }

  ngOnInit() {
    this.shop = JSON.parse(localStorage.getItem(Utils.SHOP_KEY));
    this.hasLoggedIn =this.shop !=null;
    this.salesOrderService.getStatuses()
      .subscribe((orderStatuses: Array<OrderStatus>) => {
        Utils.setOrderStatuses(orderStatuses);
      });
  }
  changeShopName() {
    this.shop = null;
    this.hasLoggedIn = true;
   // this.Admin = true;

   // this.hasLoggeduser = false;
  }
  changeadmin(){
   // this.hasLoggeduser = true;
    this.hasLoggedIn = true;
  }
  afterShopSelected($event) {
    //console.log($event);
    if ($event == null) {
      this.shop = null;
      this.hasLoggedIn = true;
     // this.hasLoggeduser = false;
    }
    else {
      this.shop = $event;
    
      localStorage.removeItem(Utils.SHOP_KEY);
      localStorage.setItem(Utils.SHOP_KEY, JSON.stringify(this.shop));
      this.hasLoggedIn = false;
      this.Admin = true;
      //console.log("else",this.hasLoggedIn );
     // this.hasLoggeduser = false;
    }
  }
  username:string='';
  userenter(event){
    //console.log(event);
    this.username = event;
    this.hasLoggedIn = false;
    this.Admin = false;
   // console.log("else", this.Admin );
    //this.hasLoggedIn = false;
  }
  Adminlogout(){
    this.hasLoggedIn = true;
  }
  edit:string ="anumod";
}
