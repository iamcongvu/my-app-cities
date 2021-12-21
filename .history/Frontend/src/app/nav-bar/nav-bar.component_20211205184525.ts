import { AlertifyService } from './../../services/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser?: string;
  constructor(private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  loggedIn(){
    this.loggedinUser = localStorage.getItem('token') || '{}';
    return this.loggedinUser;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success("You are logged out");
  }
}
