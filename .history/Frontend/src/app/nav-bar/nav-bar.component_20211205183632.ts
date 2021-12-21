import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser: string;
  constructor() { }

  ngOnInit(): void {
  }

  loggedIn(){
    this.loggedinUser = localStorage.getItem('token') || "{}";
    return this.loggedinUser!==null ? this.loggedinUser : localStorage.removeItem('token');
  }

  onLogout(){
    localStorage.removeItem('token');
  }
}
