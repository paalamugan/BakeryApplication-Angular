import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import{Router} from '@angular/router';
import{ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  edit:string;
  custom:boolean;
  isPopupOpened = true;
  displayedColumns = ['id','modelNumber', 'name', 'quantity', 'price', 'actionsColumn'];
  @Input() public selectedItem: Product;
  public products: Array<Product> = [];
  public dataSource = new MatTableDataSource(this.products);

  constructor(private productService: ProductService,private route:ActivatedRoute, private router: Router, private dialog?: MatDialog) { }
  applyFilter(){
    var input, filter, table, tr, td, i,firstcol,fifthcol,sixthcol,nineth,tenth;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      firstcol = tr[i].getElementsByTagName("td")[1];
      fifthcol=tr[i].getElementsByTagName("td")[2];
      sixthcol=tr[i].getElementsByTagName("td")[4];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || fifthcol.innerHTML.toUpperCase().indexOf(filter) > -1 ||sixthcol.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}
  ngOnInit() {
    this.edit = this.route.snapshot.params['admin'];
    if(this.edit=="anumod"){
      this.custom=false;
    }else{
this.custom = true;
    }
    this.productService.getAll()
      .subscribe((resultData: Array<Product>) => {
        this.products = resultData;
        this.dataSource = new MatTableDataSource(this.products);
      });
  }
  editproduct(product: Product) {
    //this.router.navigate(['/product-list',product._id]);
    this.isPopupOpened = true;
 
    const dialogRef = this.dialog.open(ProductEditComponent, {
    
      data: product

    });
 

    dialogRef.afterClosed().subscribe(product => {
      this.isPopupOpened = false;
    });

  }
  // deleteproduct(product: Product){
  //   console.log(product.id);
  //   if(confirm('Are you sure to delete this order ?') == true){
  //     this.productService.deleteProduct(product)
  //     .subscribe((response) => {
  //  this.products.splice(this.products.indexOf(product),1);
  //     },(err)=>{
  //       console.log(err);
  //     });
  //   }
  // }

}


