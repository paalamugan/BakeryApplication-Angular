import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { MatInput, MatSnackBar, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('itemNameInput') itemName: MatInput;
  public products: Array<Product>=[];
  public product:string="";
  public item: Product
    = new Product(1,"",1,1,"");
  constructor(private productService: ProductService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.itemName.focus();
    this.productService.getAll()
    .subscribe((resultData: Array<Product>) => {
      this.products = resultData;
      // resultData.forEach(element => {
      //    this.product = element.modelNumber
      //  });
    });
   
  }
  onSubmit() {
    this.products.forEach(element => {
     // console.log(element.modelNumber);
     if(element.modelNumber===this.item.modelNumber){
       this.product=element.modelNumber;
      
     }
     
   });
   if(this.product == this.item.modelNumber){
    this.snackBar.open("Model number already exist","", {
                   duration: 3000,
                  });
   }else{
    if(this.item.quantity > 0 && this.item.price > 0){

        this.productService.addProduct(this.item)
        .subscribe((response:Product) => {
          this.products.push(response);
         // console.log(response);
          this.snackBar.open("Added Product Successfully", "Ok", {
            duration: 2000,
          });
        }
        );
      this.item.name = "";
      this.item.price = 1;
      this.item.quantity = 1;
      this.item.modelNumber = "";
      this.itemName.focus();
      }
      else if(this.item.price === 0){
      
       this.snackBar.open("Price must be greater than 0","", {
                    duration: 3000,
                  });
        }else if(this.item.quantity === 0){
          this.snackBar.open("Quantity must be greater than 0","", {
            duration: 3000,
          });
        }
        }

}
   

  
}
