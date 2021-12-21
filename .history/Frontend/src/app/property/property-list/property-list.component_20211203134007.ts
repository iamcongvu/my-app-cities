import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Property: Array<any> = [
    {
      "Id": 1,
      "Name": "Birla House",
      "Type": "House",
      "Price": 12000
    },
    {
      "Id": 2,
      "Name": "Birla House",
      "Type": "House",
      "Price": 12000
    },
    {
      "Id": 3,
      "Name": "Birla House",
      "Type": "House",
      "Price": 12000
    },
    {
      "Id": 4,
      "Name": "Birla House",
      "Type": "House",
      "Price": 12000
    },
    {
      "Id": 5,
      "Name": "Birla House",
      "Type": "House",
      "Price": 12000
    }
  ]
}
