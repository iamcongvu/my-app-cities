import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/models/ipropertybase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html', //important more than template
  //template: '<h1>Hello world</h1>',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() property: IPropertyBase;
  @Input() hideIcons: boolean;
}
