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
        SellRent: [1, Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),
      AddressInfo: this.fb.group({
        FlorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        Landmark: [null],
      }),
      OrtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      })
    });
  }


  //#region Getter method
    //#region <FormGroup>
  get BasicInfo() {
    return this.addPropertyForm.controls["BasicInfo"] as FormGroup;
  }
  get PriceInfo() {
    return this.addPropertyForm.controls["PriceInfo"] as FormGroup;
  }
  get AddressInfo() {
    return this.addPropertyForm.controls["AddressInfo"] as FormGroup;
  }
  get OrtherInfo() {
    return this.addPropertyForm.controls["OrtherInfo"] as FormGroup;
  }
    //#endregion <FormGroup>
    //#region <FormControl>
    get SellRent(){
      return this.BasicInfo.controls["SellRent"] as FormControl;
    }
    get PType(){
      return this.BasicInfo.controls["PType"] as FormControl;
    }
    get Name() {
      return this. BasicInfo.controls["Name"] as FormControl;
    }
    get City() {
      return this.BasicInfo.controls["City"] as FormControl;
    }
    get Price() {
      return this.PriceInfo.controls["Price"] as FormControl;
    }
    get BuiltArea() {
      return this.PriceInfo.controls["BuiltArea"] as FormControl;
    }
    get Address() {
      return this.AddressInfo.controls["Address"] as FormControl;
    }
    get RTM(){
      return this.OrtherInfo.controls["RTM"] as FormControl;
    }
    get PossessionOn() {
      return this.OrtherInfo.controls["PossessionOn"] as FormControl;
    }
    //#endregion <FormControl>
  //#endregion Getter method


  onBack() {
    this.router.navigate(['/'])
  }

  onSubmit(){
    this.nextClicked = true;
    if(this.allTabsValid()){
      console.log("Congrats, your property listed successfully on our website");
      console.log(this.addPropertyForm)
    }else {
      console.log("Oh, Please review the form and provide all valid");
    }
  }

  allTabsValid(): boolean {
    if(this.BasicInfo.invalid)
    {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if(this.PriceInfo.invalid)
    {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if(this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if(this.OrtherInfo.invalid){
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
