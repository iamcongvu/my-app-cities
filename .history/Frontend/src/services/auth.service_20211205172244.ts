import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any)
  {
    let UserArray: any[] = [];
    if(localStorage.getItem('Users')){
      UserArray = JSON.parse(localStorage.getItem('Useres') || '[]');
    }
    return UserArray.find((p)=>{p.userName === user.userName && p.password === user.password})
  }
}
