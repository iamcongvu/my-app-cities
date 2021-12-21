import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserArray: Array<any> = [];

  constructor() { }

  authUser(user: any)
  {
    if(localStorage.getItem('Users')){
      this.UserArray = JSON.parse(localStorage.getItem('Useres') || '{}');
    }
    return this.UserArray.find((p)=>p.userName === user.userName && p.password === user.password)
  }
}
