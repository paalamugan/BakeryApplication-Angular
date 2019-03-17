import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { OrderStatus } from '../../models/order-status';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatTableDataSource, MatInput } from '@angular/material';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder } from '../../models/sales-order';
import { Utils } from '../../utils';
import { OrderItem } from '../../models/order-item';
import { FlavourService } from '../../services/flavour.service';
import { Flavour } from '../../models/flavour';
import { Observable } from '../../../../node_modules/rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { UomService } from '../../services/uom.service';
import { Uom } from '../../models/uom';
@Component({
  selector: 'app-all-sales-report-edit',
  templateUrl: './all-sales-report-edit.component.html',
  styleUrls: ['./all-sales-report-edit.component.css']
})
export class AllSalesReportEditComponent implements OnInit {
  public flavours: Array<Flavour> = [];
  public products: Array<Product> = [];
  public uoms: Array<Uom> = [];
  @ViewChild('itemNameInput') itemName: MatInput;
 
  product:Product;
  public filteredOptions: Observable<Product[]>;
  public filteredflavour: Observable<Flavour[]>;
  formControl: FormControl = new FormControl();
  myControl: FormControl = new FormControl();
  public orderStatuses: Array<OrderStatus>;
  public orderItems: Array<OrderItem> = [];
  item:OrderItem;
  selecteduom:Uom;
  selectedflavour:Flavour;
  quantity:number;
  addnew:boolean=false;
  salesorder:SalesOrder;
  price:number;
  productvalue:string;
  dataSource: MatTableDataSource<OrderItem>;
  date:Date;
  constructor(
    private dialogRef: MatDialogRef<AllSalesReportEditComponent>,
    private salesOrderService: SalesOrderService,
    public snackBar: MatSnackBar, private productService: ProductService,private uomService: UomService,private flavourService: FlavourService,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrder
  ) {
    this.dataSource = new MatTableDataSource<OrderItem>(this.data.orderItems);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

balance:number;
  ngOnInit() {
    this.date=this.data.expectedDate;
    this.orderItems=this.data.orderItems;   

    this.productService.getAll()
    .subscribe((resultData: Array<Product>) => {
      this.products = resultData;
  
    });
  this.filteredOptions = this.formControl.valueChanges.pipe(
    startWith(''),
    map(val => this.filter(val))
  );
  this.flavourService.getAll()
  .subscribe((resultData: Array<Flavour>) => {
    this.flavours = resultData;
  });
  this.uomService.getAll()
      .subscribe((uom: Array<Uom>) => {
        this.uoms = uom;

      });
  this.orderStatuses = Utils.getOrderStatuses() ;
  this.balance=this.data.total - this.data.advance;
  }
  deleteitem(orderItem:OrderItem){
    for (var i = this.orderItems.length; i--;) {
      if (this.orderItems[i] === orderItem) {
        this.data.total=this.data.total-orderItem.product.price*orderItem.quantity;
        this.orderItems.splice(i, 1);
      }
    }
    //this.orderItems.splice( this.orderItems.indexOf(("foo"), 1 );
      // for(let i=0; i<this.orderItems.length; i++){
      //   if(this.orderItems[i]["id"] === orderItem.id){
      //    // this.orderItems.splice( this.orderItems.indexOf((i), 1 );
      //    this.data.total=this.data.total-orderItem.product.price;
      //    console.log(this.orderItems);
      //   this.orderItems.splice(i,1)[0];
      
        
      //   }
      // }
     
        //  this.item = new OrderItem(
        //   1,
        //   this.product,
        //   this.price,
        //   1,
        //   this.selecteduom,
        //   this.selectedflavour,
        //   null
        // );
    }
  applyFilter(value: any): any[] {

    return this.flavours.filter(flavour => flavour.name.toLowerCase().indexOf(value.toLowerCase()) === 0);

  }
  filter(val: any): any[] {
    return this.products.filter(product => product.modelNumber.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  condition:boolean;
add(order:SalesOrder){
  this.condition=false;
  for (let i of this.uoms) {
    if (i.name == "Kg") {

      this.selecteduom = i;
    }
  }
  for (let i of this.flavours) {
    if (i.name == "Plain") {

      this.selectedflavour = i;
    }
  }
  this.item = new OrderItem(
    1,
    this.product,
    this.price,
    1,
    this.selecteduom,
    this.selectedflavour,
    null
  );
this.addnew=!this.addnew;
}

onSelectionChange(event,product:Product){
  if (event.isUserInput) {
    this.item.product=product;
    this.price=product.price;
    this.item.price=this.price;
    this.condition=true;
    }
}
saveitem(){
  if(this.condition){
    this.data.total = this.data.total+this.price*this.item.quantity;
    this.orderItems.push(this.item);
   
    this.item = new OrderItem(
      1,
      this.product,
      this.price,
      1,
      this.selecteduom,
      this.selectedflavour,
      null
    );
   
  this.addnew=false;
  }else{
     this.addnew=true;
    this.itemName.focus();
  }
  

}
  onSubmit() {
    if(this.date==this.data.expectedDate){
this.data.expectedDate=this.date;
    }else{
      var today = new Date(this.data.expectedDate);
      var tomorrow = new Date(today);
      tomorrow.setDate(today.getDate()+1);
      tomorrow.toLocaleDateString();
      this.data.expectedDate=tomorrow;
    }
  this.data.orderItems=this.orderItems;
    this.salesOrderService.editSalesOrder(this.data)
      .subscribe((response) => {
        this.dialogRef.close();
      });
  }

}
