import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Shop } from '../models/shop';
import { GeneralService } from '../services/general.service';
import { MatSnackBar } from '@angular/material';
import { Utils } from '../utils';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import{Router} from '@angular/router';
@Component({
  selector: 'store-selector',
  templateUrl: './store-selector.component.html',
  styleUrls: ['./store-selector.component.css']
})
export class StoreSelectorComponent implements OnInit {
  unamePattern = "^[a-z0-9_-]{8,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  
  options: FormGroup;
  hide = true;
  selector:boolean = true;
  public shops: Array<Shop> = null;
  public selectedShopName: string = "";
  @Output() chooseShop = new EventEmitter();
  @Output() chooseuser = new EventEmitter();
  constructor(private router:Router,
    private generalServices: GeneralService,
    public snackBar: MatSnackBar,fb: FormBuilder
  ) {this.options = fb.group({
    floatLabel: 'never',
  }) 
 }

  ngOnInit() {
   
    this.generalServices.getShops()
      .subscribe((shops: Array<Shop>) => {
       
        this.shops = shops;
      });
      
  }

  onOk() {
    let selectedShop: Shop = null;
    this.shops.forEach(element => {
     // console.log(element);
      if (element.shopName == this.selectedShopName) {
        selectedShop = element;
        //console.log(selectedShop);
      }
    });
    localStorage.setItem(Utils.SHOP_KEY, JSON.stringify(selectedShop));
    this.chooseShop.emit(selectedShop);
    this.router.navigate(['/bill']);
  }
  username:string ="1234"
  password:string ="1234"
  edit:string="anumod";
  loginUser(event){
   
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    if(this.username == username && this.password == password){
      this.chooseuser.emit(username);
      this.router.navigate(['/orderlist',{admin:this.edit}]);
    }else{
      this.snackBar.open("enter a correct user name and password","",{
        duration: 3000
      });
    }
    
   

  }
  adminlogin(){
    this.selector = false;
  }
}
