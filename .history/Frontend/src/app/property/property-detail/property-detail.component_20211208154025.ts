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
  propertyId!: number;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  constructor(private route: ActivatedRoute, private router: Router, private houstingService: HousingService) { }
  property = new Property()
  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['Id']

    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['Id']
      }
    )
  }
  onSelectNext() {
    this.propertyId += this.route.snapshot.params['id'];
    this.route.params.subscribe((param) => {
      this.propertyId = +param['id'],
      this.houstingService.getProperties(this.propertyId).subscribe(
        data =>
        {
          this.property.Name = data?.Name | null;
        }
      )
    })
    this.router.navigate(['property-detail/'+this.propertyId]);
  }
}
