import { Injectable } from '@angular/core';
import{Customer} from '../models/customer';
import { Utils } from '../utils';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  public findByMobile(mobile: string) {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');
    let httpParams = new HttpParams()
      .set('mobile', mobile);
    return this.httpClient.get(`${Utils.findCustomerURL()}`, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }
  public getAll() {
    return this.httpClient.get(`${Utils.getCustomerURL()}`);
  }
   public addCustomer(customer: Customer) {
    return this.httpClient.post(`${Utils.addCustomerURL()}`, customer);
  }
  public editCustomer(customer: Customer) {
    return this.httpClient.post(`${Utils.editCustomerURL()}`, customer);
  }
  
}
