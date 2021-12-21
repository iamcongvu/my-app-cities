import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { FormBuilder, FormControl, FormControlStatus, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IProperty } from 'src/app/models/iproperty';
import { IPropertyBase } from 'src/app/models/ipropertybase';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/services/housing.service';

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
  property = new Property();
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
    BuiltArea: undefined,
    City: '',
    RTM: undefined
  };

  constructor(private router: Router, private housingService: HousingService, private fb: FormBuilder) {
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
  get OtherInfo() {
    return this.addPropertyForm.controls["OrtherInfo"] as FormGroup;
  }
    //#endregion <FormGroup>
    //#region <FormControl>
    //#region Basic Info
    get SellRent(){
      return this.BasicInfo.controls["SellRent"] as FormControl;
    }
    get BHK() {
      return this.BasicInfo.controls["BHK"] as FormControl;
    }
    get PType(){
      return this.BasicInfo.controls["PType"] as FormControl;
    }
    get FType(){
      return this.BasicInfo.controls["FType"] as FormControl;
    }
    get Name() {
      return this. BasicInfo.controls["Name"] as FormControl;
    }
    get City() {
      return this.BasicInfo.controls["City"] as FormControl;
    }
    //#endregion Basic Info
    //#region Price Info
    get Price() {
      return this.PriceInfo.controls["Price"] as FormControl;
    }
    get BuiltArea() {
      return this.PriceInfo.controls["BuiltArea"] as FormControl;
    }
    get CarpetArea() {
      return this.PriceInfo.controls["CarpetArea"] as FormControl;
    }
    get Security() {
      return this.PriceInfo.controls["Security"] as FormControl;
    }
    get Maintenance() {
      return this.PriceInfo.controls["Maintenance"] as FormControl;
    }
    //#endregion Price Info
    //#region Address Info
    get FloorNo() {
      return this.AddressInfo.controls["FloorNo"] as FormControl;
    }
    get TotalFloor() {
      return this.AddressInfo.controls["TotalFloor"] as FormControl;
    }
    get Address() {
      return this.AddressInfo.controls["Address"] as FormControl;
    }
    get Landmark() {
      return this.AddressInfo.controls["Landmark"] as FormControl;
    }
    //#endregion Address Info
    //#region Other Info
    get RTM(){
      return this.OtherInfo.controls["RTM"] as FormControl;
    }
    get PossessionOn() {
      return this.OtherInfo.controls["PossessionOn"] as FormControl;
    }
    get AOP() {
      return this.OtherInfo.controls["AOP"] as FormControl;
    }

    get Gated() {
      return this.OtherInfo.controls["Gated"] as FormControl;
    }

    get MainEntrance() {
      return this.OtherInfo.controls["MainEntrance"] as FormControl;
    }

    get Description() {
      return this.OtherInfo.controls["Description"] as FormControl;
    }
    //#endregion Other Info
    //#endregion <FormControl>
  //#endregion Getter method


  onBack() {
    this.router.navigate(['/'])
  }

  onSubmit(){
    this.nextClicked = true;
    if(this.allTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.property);
      console.log("Congrats, your property listed successfully on our website");
      console.log(this.addPropertyForm)
    }else {
      console.log("Oh, Please review the form and provide all valid");
    }
  }

  mapProperty() {
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.Landmark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
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
    if(this.OtherInfo.invalid){
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
