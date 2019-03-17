import { Component, OnInit, Input } from '@angular/core';
import { FlavourEditComponent } from '../flavour-edit/flavour-edit.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Flavour } from '../../models/flavour';
import { FlavourService } from '../../services/flavour.service';
import{ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-flavour-list',
  templateUrl: './flavour-list.component.html',
  styleUrls: ['./flavour-list.component.css']
})
export class FlavourListComponent implements OnInit {
  isPopupOpened = true;
 // displayedColumns = ['id', 'name', 'code', 'actionsColumn'];
  public flavours: Array<Flavour> = [];
  public dataSource = new MatTableDataSource(this.flavours);
edit:string;
custom:boolean;
  constructor(private flavourService: FlavourService, private route:ActivatedRoute, private dialog?: MatDialog) { }
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
    this.flavourService.getAll()
      .subscribe((resultData: Array<Flavour>) => {
        this.flavours = resultData;
        this.dataSource = new MatTableDataSource(this.flavours);
      });
  }
  editproduct(flavour : Flavour) {
    //this.router.navigate(['/product-list',product._id]);
    this.isPopupOpened = true;
 
    const dialogRef = this.dialog.open(FlavourEditComponent, {
    
      data: flavour

    });
 

    dialogRef.afterClosed().subscribe(flavour => {
      this.isPopupOpened = false;
    });

  }

}