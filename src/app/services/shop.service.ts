import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils';
import { Shop } from '../models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient: HttpClient) { }
  public getAll() {
    return this.httpClient.get(`${Utils.getShopURL()}`);
  }
  public getShopAll() {
    return this.httpClient.get(`${Utils.getShopURL()}`);
  }
 public addShop(shop: Shop) {
    return this.httpClient.post(`${Utils.addShopURL()}`, shop);
  }
  public editShop(shop: Shop) {
    return this.httpClient.post(`${Utils.editShopURL()}`,shop);
  }
}
// return this.httpClient.post(`${Utils.editProductURL()}`+`/${shop.id}`,shop);