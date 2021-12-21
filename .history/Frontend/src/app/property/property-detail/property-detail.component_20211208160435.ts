import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  property = new Property();
  constructor(private route: ActivatedRoute, private router: Router, private houstingService: HousingService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['Id']

    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['Id'];
        this.houstingService.getProperty(this.propertyId).subscribe(
          (data: Property) =>
          {
            this.property = data;
          }
        )
      }
    )
  }
}
