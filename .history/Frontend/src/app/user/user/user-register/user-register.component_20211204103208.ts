import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  public registerationForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.registerationForm = new FormGroup({
      userName: new FormControl('Cong', Validators.required)
    })
  }

  onSubmit() {
    console.log(this.registerationForm)
  }

}
