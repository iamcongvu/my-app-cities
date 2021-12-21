import { Component, Input, OnInit } from '@angular/core';

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
  @Input() property: any;
}
