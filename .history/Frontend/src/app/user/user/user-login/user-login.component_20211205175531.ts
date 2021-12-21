import { AlertifyService } from './../../../../services/alertify.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm){
    const token = this.authService.authUser(loginForm.value);
    if(token){
      localStorage.setItem('token', token.userName)
      this.alertify.success('Login successfully');
    }else
    {
      this.alertify.error('Login failed');
    }
  }
}
