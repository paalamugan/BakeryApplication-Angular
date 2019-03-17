import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatSnackBar } from '@angular/material';
import { Flavour } from '../../models/flavour';
import { FlavourService } from '../../services/flavour.service';

@Component({
  selector: 'app-flavour-add',
  templateUrl: './flavour-add.component.html',
  styleUrls: ['./flavour-add.component.css']
})
export class FlavourAddComponent implements OnInit {
  @ViewChild('flavourNameInput') flavourname: MatInput;
  public flavours:Array<Flavour> =[];
  public flavour1:string="";
  public flavour: Flavour
 
  = new Flavour(1,"","");
  constructor(private flavourService: FlavourService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.flavourname.focus();
    this.flavourService.getAll()
    .subscribe((resultData: Array<Flavour>) => {
      this.flavours = resultData;
    });
  }
  onSubmit(){
    this.flavours.forEach(element => {
      if(element.name===this.flavour.name){
        this.flavour1=element.name;
       
      }
      
    });
    if(this.flavour1===this.flavour.name){
     this.snackBar.open("Flavour Name already exist","", {
                    duration: 3000,
                   });
    }else{
      this.flavourService.addFlavour(this.flavour)
      .subscribe((response:Flavour) => {
        this.flavours.push(response);
        this.snackBar.open("Added Flavour Successfully", "Ok", {
          duration: 2000,
        });
      }
      );
    this.flavour.name ="";
    this.flavour.code ="";
    this.flavourname.focus();
    }
    
  }
}
