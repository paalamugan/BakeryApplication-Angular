import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ShopEditComponent } from '../shop-edit/shop-edit.component';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop.service';
import{ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  edit:string;
  custom:boolean;
  isPopupOpened = true;
  displayedColumns = ['id', 'name', 'code', 'actionsColumn'];
  public shops: Array<Shop> = [];

  public dataSource = new MatTableDataSource(this.shops);

  constructor(private shopService: ShopService, private route:ActivatedRoute, private dialog?: MatDialog) { }
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
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || firstcol.innerHTML.toUpperCase().indexOf(filter) > -1 || fifthcol.innerHTML.toUpperCase().indexOf(filter) > -1) {
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
    this.shopService.getShopAll()
      .subscribe((resultData: Array<Shop>) => {
        this.shops = resultData;
        this.dataSource = new MatTableDataSource(this.shops);
      });
   
  }
  editshop(shop: Shop) {
    //this.router.navigate(['/product-list',product._id]);
    this.isPopupOpened = true;
 
    const dialogRef = this.dialog.open(ShopEditComponent, {
    
      data: shop

    });
 

    dialogRef.afterClosed().subscribe(shop => {
      this.isPopupOpened = false;
    });

  }

}
