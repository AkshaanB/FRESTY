import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{


  constructor(private auth: AuthService) { }


  canActivate(): boolean{
    return this.auth.isAuthenticated(); //to check if the user is a member or not 
  }
}
