import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm){
    const token = this.authService.authUser(loginForm.value);
    if(token){
      localStorage.setItem('token', token.userName);
      this.alertify.success('Login successfully');
      this.router.navigate(['/']);
    }else
    {
      this.alertify.error('Login failed');
    }
  }
}
