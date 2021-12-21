import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerationForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.registerationForm = new FormGroup({
      userName: new FormControl()
    })
  }

  onSubmit() {
    console.log(this.registerationForm)
  }

}
