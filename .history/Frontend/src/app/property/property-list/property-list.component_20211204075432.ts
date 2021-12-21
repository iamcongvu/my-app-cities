import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HousingService } from 'src/services/housing.service';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  SellRent = 1;
  properties!: IProperty[];
  subcription = new Subscription();
  constructor(private route: ActivatedRoute, private housingService: HousingService) { }
  ngOnInit(): void {
    if(this.route.snapshot.url.toString())
    {
      this.SellRent = 2// means we are on rent-property URL else we are on base URL
    }
    this.housingService.getAllProperties(this.SellRent)
      .subscribe(data => {
        this.properties = data
        console.log(data)
      }, error =>{
        console.log(error)
      });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
