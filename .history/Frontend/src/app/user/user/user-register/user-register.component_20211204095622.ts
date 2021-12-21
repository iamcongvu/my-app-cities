import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registeratiopnForm!: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.registeratiopnForm = new FormGroup({
      userName: new FormControl()
    })
  }

}
