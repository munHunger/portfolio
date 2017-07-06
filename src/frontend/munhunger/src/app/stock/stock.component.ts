import { Component } from '@angular/core';
import {WunderbarService} from "../wunderbar.service";
import {Item} from "../item.model";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  beerList: Item[] = [];
  beerListHash: string;
  ciderList: Item[] = [];
  ciderListHash: string;
  wineList: Item[] = [];
  wineListHash: string;
  drinkList: Item[] = [];
  drinkListHash: string;
  constructor(private service: WunderbarService)
  {
    this.service.getCategory("beer").subscribe(items => {
      this.beerList = items.json();
      this.beerListHash = items.headers.get('hash');
      this.updateBeer();
    });
    this.service.getCategory("cider").subscribe(items => {
      this.ciderList = items.json();
      this.ciderListHash = items.headers.get('hash');
      this.updateCider();
    });
    this.service.getCategory("wine").subscribe(items => {
      this.wineList = items.json();
      this.wineListHash = items.headers.get('hash');
      this.updateWine();
    });
    this.service.getCategory("drink").subscribe(items => {
      this.drinkList = items.json();
      this.drinkListHash = items.headers.get('hash');
      this.updateDrink();
    });
  }

  public updateBeer()
  {
    this.service.getCategoryUpdate("beer", this.beerListHash).subscribe(items => {
      var newList = items.json().list;
      if(newList.length > 0)
      {
        this.beerList = newList;
        this.beerListHash = items.json().hash;
      }
      this.updateBeer();
    });
  }
  public updateCider()
  {
    this.service.getCategoryUpdate("cider", this.ciderListHash).subscribe(items => {
      var newList = items.json().list;
      if(newList.length > 0)
      {
        this.ciderList = newList;
        this.ciderListHash = items.json().hash;
      }
      this.updateCider();
    });
  }
  public updateWine()
  {
    this.service.getCategoryUpdate("wine", this.wineListHash).subscribe(items => {
      var newList = items.json().list;
      if(newList.length > 0)
      {
        this.wineList = newList;
        this.wineListHash = items.json().hash;
      }
      this.updateWine();
    });
  }
  public updateDrink()
  {
    this.service.getCategoryUpdate("drink", this.drinkListHash).subscribe(items => {
      var newList = items.json().list;
      if(newList.length > 0)
      {
        this.drinkList = newList;
        this.drinkListHash = items.json().hash;
      }
      this.updateDrink();
    });
  }
}
