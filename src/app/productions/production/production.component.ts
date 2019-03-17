import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder } from '../../models/sales-order';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { OrderItem } from '../../models/order-item';
import { Utils } from '../../utils';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { Shop } from '../../models/shop';
import { GeneralService } from '../../services/general.service';
import{ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  public salereports: Array<SalesOrder>=[];
  public salereports1:Array<SalesOrder>=[];
  public selectshop: SalesOrder;
 public orderitem: Array<OrderItem>;
 shop:string;
 edit:string;
 change:string;
 on1:boolean;
 //expectedDate = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0];
 expectedDate:Date;
 today: number = Date.now();
 public shops: Array<Shop> = [];
 public selectedShopName: string = "";
 @ViewChild('printsection') printsection: ElementRef;
  constructor(private salesOrderService: SalesOrderService,private route:ActivatedRoute,private router:Router,private snackBar: MatSnackBar,
  ) { }
  ngOnInit() {
    this.expectedDate=new Date();
    this.shop = this.route.snapshot.params['shop']; 
    this.edit = this.route.snapshot.params['admin'];
   
    if(this.edit=="anumod"){
      this.change="anumod1";
      this.salesOrderService.getPendingParam()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salereports=resultData;
        this.salereports1=resultData;
      });
    }else{
      this.change=this.shop;
      this.salesOrderService.getPendingParam()
      .subscribe((resultData: Array<SalesOrder>) => {
        resultData.forEach(element => {
          if(element.shop.shopName == this.shop){
            this.salereports.push(element);
            this.salereports1.push(element);
          }
        });
      });
    }
    
    
   
  }
 
 on(){

  this.on1=true;
  if(this.on1==true && this.expectedDate !=null){
    var today = new Date(this.expectedDate);
var tomorrow = new Date(today);
tomorrow.setDate(today.getDate()+1);
tomorrow.toLocaleDateString();
var tom = new Date(tomorrow.toString().split('GMT')[0]+' UTC').toISOString().split('T')[0].toString();
    var expectday = new Date(this.expectedDate.toString().split('GMT')[0]+' UTC').toISOString().split('T')[0].toString();
        
                  this.salereports1=[];
        this.salereports.forEach(element => {
          var elem = element.expectedDate.toString();
          var time = element.expectedTime.toString();
        
          if((elem==expectday) || (tom == elem && time <= "10:00:00")){
      this.salereports1.push(element);
          }
         });
         this.expectedDate=null;
  }else{
    this.snackBar.open("Select a Date","", {
            duration: 3000,
          });
        
    
  }
    // this.on1=!this.on1;
//   if(this.on1==true && this.expectedDate !=null){
//     var expectday = new Date(this.expectedDate.toString().split('GMT')[0]+' UTC').toISOString().split('T')[0]
//      var today = expectday.toString();
//      this.salereports1=[];
//     this.salereports.forEach(element => {
//       var elem = element.expectedDate.toString();
//       if(elem==today){
//   this.salereports1.push(element);
//   console.log(this.salereports);
//       }
//      });
//  this.expectedDate=null;
//   }else if(this.on1!=true && this.expectedDate !=null){
    
//     var expectday = new Date(this.expectedDate.toString().split('GMT')[0]+' UTC').toISOString().split('T')[0]
//      var today = expectday.toString();
//      this.salereports1=[];
//     this.salereports.forEach(element => {
//       var elem = element.expectedDate.toString();
//       if(elem==today){
//   this.salereports1.push(element);
//       }
//      });
//      this.salereports=this.salereports1;
//   this.expectedDate=null;
//   }else{
//     this.snackBar.open("Select a Date","", {
//       duration: 3000,
//     });
  
//   }
  
 }
  onSubmit():void{
   
    if(this.salereports1.length>0){
      this.salesOrderService.movetoProduction(this.salereports1)
      .subscribe((resultData:Array<SalesOrder>) => {
        this.router.navigate(['/orderlist',{shop1:this.change}]);
      }); 
      let printContents, popupWin;
    
      printContents = document.getElementById('printsection').innerHTML;
      popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
         
            <style>
            html, body {
            
              display: block; 
              font-family: "Calibri";
              margin: 0px;
              font-size:auto;
            }
          table{
            width: 100%;
              max-width: 100%;
              margin-bottom: 20px;
          }

          table td{
            table-layout: fixed;
            width: 150px;
            overflow: hidden; 
            word-wrap: break-word;
          }
          .shop_top{
            position:relative;
            bottom:20px;
          }
          .message{
            width: 40%;

          }
          .allow{
            width: 100%;
          }
          .fixed{
            border-bottom: 2px solid;
        }
        .text-center{
          text-align:center;
        } 
        .comments{
          width: 40%;
          word-wrap: break-word;
          border-color: white;
       }
    .display{
      display: none;
  }
  .none{
    float:right;
  }
            </style>
          </head>
      <body onload="window.print();window.close()"> ${printContents}</body>
        </html>`
      );
      popupWin.document.close();
    
    
    }else{
      this.snackBar.open("No pending list","", {
        duration: 3000,
      });
    }
   
 

}
}
