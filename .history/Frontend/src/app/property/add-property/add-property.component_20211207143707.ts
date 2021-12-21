import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { FormBuilder, FormControl, FormControlStatus, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
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
  //@ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  addPropertyForm: FormGroup;
  nextClicked: boolean = false;
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

  constructor(private router: Router, private forms: FormsModule, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createAddPropertyForm();
  }

  createAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: [null, Validators.required],
        PType: [null, Validators.required],
        Name: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
      })
    });
  }

  // ---------------
  // Getter method
  // ---------------
  get BasicInfo() {
    return this.addPropertyForm.controls["BasicInfo"] as FormGroup;
  }
  get PriceInfo() {
    return this.addPropertyForm.controls["PriceInfo"] as FormGroup;
  }
  get SellRent(){
    return this.BasicInfo.controls["SellRent"] as FormControl;
  }
  get PType(){
    return this.BasicInfo.controls["PType"] as FormControl;
  }
  get Name() {
    return this. BasicInfo.controls["Name"] as FormControl;
  }
  get Price() {
    return this.PriceInfo.controls["Price"] as FormControl;
  }
  get BuiltArea() {
    return this.PriceInfo.controls["BuiltArea"] as FormControl;
  }


  onBack() {
    this.router.navigate(['/'])
  }

  onSubmit(){
    console.log(this.addPropertyForm)
    console.log(this.addPropertyForm.value.BasicInfo.SellRent)
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
