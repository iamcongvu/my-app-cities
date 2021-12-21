import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  constructor(private router: Router, private forms: FormsModule) { }

  ngOnInit(): void {
  }

  onBack() {
    this.router.navigate(['/'])
  }

  onSubmit(Form: NgForm){
    console.log(Form)
  }
}
