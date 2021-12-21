import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: User)
  {
    let UserArray: Array<User> = [];
    if(localStorage.getItem('Users')){
      UserArray = JSON.parse(localStorage.getItem('Useres') || '[]');
    }
    return UserArray.find((p)=>p.userName === user.userName && p.password === user.password)
  }
}
