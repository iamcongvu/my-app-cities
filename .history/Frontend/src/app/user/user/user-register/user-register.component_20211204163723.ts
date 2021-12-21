import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  public registerationForm: FormGroup;
  user: any = {};
  constructor(private fb: FormBuilder) { };

  ngOnInit(): void {
    this.registerationForm = new FormGroup({
      userName: new FormControl('Cong', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, Validators.required),
      mobile: new FormControl(null, [Validators.required, Validators.minLength(10)])
    }, this.passwordMatchingValidator)
    //this.createRegisterForm();
  }

  // createRegisterForm() {
  //   this.registerationForm = this.fb.group({
  //     userName: [null, Validators.required],
  //     email: [null, Validators.required, Validators.email],
  //     password: [null, Validators.required, Validators.minLength(8)],
  //     confirmPassword: [null, Validators.required],
  //     mobile: [null, Validators.required, Validators.minLength(10)]
  //   }, {validator: this.passwordMatchingValidator});
  // }

  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerationForm.get('email') as FormControl;
  }

  get password() {
    return this.registerationForm.get('password') as FormControl;
  }

  get confirmPassword()
  {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }

  passwordMatchingValidator(fc: AbstractControl) : ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ?  null :
    {notmatched: true};
  }

  onSubmit() {
    console.log(this.registerationForm.value);
    this.user = Object.assign(this.user, this.registerationForm.value);
    this.addUser(this.user);
  }

  addUser(user: any) {
    let users = [];
    if(localStorage.getItem('Users'))
    {
      users = JSON.parse(localStorage.getItem('Users') || '{}');
      users = [user, ...users];
    }else {
      users = [user]
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

}
