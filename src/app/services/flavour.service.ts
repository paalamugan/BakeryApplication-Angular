import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils';
import { Flavour } from '../models/flavour';

@Injectable({
  providedIn: 'root'
})
export class FlavourService {
  constructor(private httpClient: HttpClient) { }
  public getAll() {
    return this.httpClient.get(`${Utils.getFlavourURL()}`);
  }
 public addFlavour(flavour: Flavour) {
    return this.httpClient.post(`${Utils.addFlavourURL()}`, flavour);
  }
  public editFlavour(flavour: Flavour) {
    return this.httpClient.post(`${Utils.editFlavourURL()}`,flavour);
  }
}
