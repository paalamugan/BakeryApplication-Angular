import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Product } from '../../models/product';
import { OrderView } from '../../models/order-view';
import { Time } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { SalesOrder } from '../../models/sales-order';
import { OrderItem } from '../../models/order-item';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatInput, MatSnackBar } from '@angular/material';
import { FlavourService } from '../../services/flavour.service';
import { Flavour } from '../../models/flavour';
import { Uom } from '../../models/uom';
import { UomService } from '../../services/uom.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  item: OrderItem;
  selected: Uom;
  selected1: Flavour;
  uoms:Uom;
  condition:boolean=false;
  flavourvalue:string;

  public products: Array<Product> = [];
  public flavours: Array<Flavour> = [];
  public uom: Array<Uom> = [];
  public filteredOptions: Observable<Product[]>;
  public filteredOptions2: Observable<Flavour[]>;
  formControl: FormControl = new FormControl();
  formControl1: FormControl = new FormControl();
  @Output() addToCart = new EventEmitter<any>();
  @Output() addToCartselect = new EventEmitter<any>();
  @ViewChild('itemNameInput') itemName: MatInput;
  @ViewChild('itemquantityInput') itemQuantity: MatInput;
  @ViewChild('quantitySearch') searchinput1: ElementRef;
  @ViewChild('inputSearch') inputSearch: ElementRef;
  @ViewChild('flavourNameInput') FlavourName: MatInput;
  
  constructor(private customerService: CustomerService, public snackBar: MatSnackBar, private flavourService: FlavourService, private uomService: UomService,
    private productService: ProductService) { }

  ngOnInit() {
   
    this.productService.getAll()
      .subscribe((products: Array<Product>) => {
        this.products = products;
        this.itemName.focus();

      });
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.flavourService.getAll()
      .subscribe((flavour: Array<Flavour>) => {
        this.flavours = flavour;

      });
      this.filteredOptions2 = this.formControl1.valueChanges.pipe(
        startWith(''),
        map(val => this.applyFilter(val))
      );
    this.uomService.getAll()
      .subscribe((uom: Array<Uom>) => {
        this.uom = uom;

      });
      
    
  }
  filter(val: any): any[] {
    return this.products.filter(product => product.modelNumber.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  applyFilter(val: any): any[] {

    return this.flavours.filter(flavour => flavour.name.toLowerCase().indexOf(val.toLowerCase()) === 0);

  }

  public search = null;
  onAdd(item: any) {
    if(this.condition===true && this.flavourvalue===this.item.flavour.name){
      this.addToCart.emit(item);
      this.itemName.focus();
      const inputsearch = <HTMLInputElement>this.inputSearch.nativeElement;
      inputsearch.select();
    
        this.item = new OrderItem(
          1,
          item.product,
          item.product.price,
          1,
          this.selected,
          this.flavour1,
          null);
      
      
     
    }else{
      for (let i of this.flavours) {
        if (i.name == "Plain") {
        
          this.item.flavour = i;
          this.addToCart.emit(item);
          this.itemName.focus();
          const inputsearch = <HTMLInputElement>this.inputSearch.nativeElement;
          inputsearch.select();
          this.item = new OrderItem(
            1,
            item.product,
            item.product.price,
            1,
            this.selected,
            this.flavour1,
            null);
        }
      }
    }
  }
public flavour1:Flavour;
  onSelectionChange(event,product: Product, flavour: Flavour, uom: Uom) {
    for (let i of this.uom) {
      if (i.name == "Kg") {

        this.selected = i;
      }
    }
   
    this.item = new OrderItem(
      1,
      product,
      product.price,
      1,
      this.selected,
      this.flavour1,
      null
    );
    
  }
  public flavoursearch = null;
  onChange(event, flavour: Flavour) {
    
    if (event.isUserInput) {
      this.item.flavour = flavour;
     this.flavour1 = this.item.flavour;
     this.condition=true;
    }
  }
}