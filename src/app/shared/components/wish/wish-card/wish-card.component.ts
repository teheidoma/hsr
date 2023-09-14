import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.css']
})
export class WishCardComponent {
  @Input()
  title = 'title';
  @Input()
  value = '';
  @Input()
  percentage = 30;
  @Input()
  color: string = '#fff';
}
