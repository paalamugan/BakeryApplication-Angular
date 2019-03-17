import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Utils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private httpClient: HttpClient) { }
  public getAll() {
    return this.httpClient.get(`${Utils.getProductURL()}`);
  }
 public addProduct(item: Product) {
    return this.httpClient.post(`${Utils.addProductURL()}`, item);
  }
  public editProduct(item: Product) {
    return this.httpClient.post(`${Utils.editProductURL()}`,item);
  }
  deleteProduct(item: Product) {
    return this.httpClient.delete(`${Utils.deleteProductURL()}`+`/${item.id}`);
    }
}
