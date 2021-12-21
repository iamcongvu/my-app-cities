import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IProperty } from 'src/app/models/iproperty';
import { IPropertyBase } from 'src/app/models/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  //Will come from master
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  finishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']
  areaTypes: Array<string> = ['East', 'West', 'Sound', 'North']

  propertyView: IPropertyBase = {
    Id: undefined,
    Name: '',
    Price: undefined,
    SellRent: undefined,
    FType: '',
    PType: '',
    BHK: undefined,
    BuiltArea: '',
    City: '',
    RTM: undefined
  };

  constructor(private router: Router, private forms: FormsModule) {


  }

  ngOnInit(): void {

  }

  onBack() {
    this.router.navigate(['/'])
  }

  onSubmit(){
    console.log(this.addPropertyForm)
  }

  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
