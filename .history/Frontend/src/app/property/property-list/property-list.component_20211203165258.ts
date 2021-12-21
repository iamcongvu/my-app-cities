import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HousingService } from 'src/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  properties!: Array<any>;
  subcription = new Subscription();

  constructor(private housingService: HousingService) { }


  ngOnInit(): void {
    this.housingService.getServices()
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
