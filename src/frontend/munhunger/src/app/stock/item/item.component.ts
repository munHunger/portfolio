import {Component, Input} from '@angular/core';
import {WunderbarService} from "../../wunderbar.service";
import {Item} from "../../item.model";
import {UserService} from "../../user.service";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input()
  public item: Item;
  private isMouseOver: boolean = false;

  private showStockEditor: boolean = window.location.search.length > 0 && window.location.search.indexOf("admin") != -1;
  constructor(private service: WunderbarService, private user: UserService)
  {
  }

  public order()
  {
    this.item.amount--;
    this.service.buyItem(this.item.name);
  }

  public decrease()
  {
    this.item.amount--;
    this.service.decrease(this.item.name);
  }
  public increase()
  {
    this.item.amount++;
    this.service.increase(this.item.name);
  }
}
