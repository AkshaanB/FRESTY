import { Injectable } from '@angular/core';

//imports for authentication

import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
const JWT_TOKEN = 'get_token';   //where the token will be saved 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false); //to check the authentication state 

  constructor(private http: HttpClient, 
    private jwtHelper: JwtHelperService, 
    private storage: Storage,
    private platform: Platform, 
    private alertController: AlertController,
     private router: Router) { 

      this.platform.ready().then(() => {
        this.tokenCheck();      //to check if the token is saved previously
      });
    }

    tokenCheck(){
      this.storage.get(JWT_TOKEN).then(tokenKey =>{
        if(tokenKey){
          let decoded = this.jwtHelper.decodeToken(tokenKey);  //from jwtHelperService 
          let isExpired = this.jwtHelper.isTokenExpired(tokenKey);

          if(!isExpired){
            this.user = decoded; 
            this.authenticationState.next(true);  //set to true after the user logged in
          }else{
            this.storage.remove(JWT_TOKEN);  //if not the token will be removed
          }
        }
      });
    }

    signIn(details){  //signin method for http post request 
      return this.http.post(`${this.url}/user/signIn`, details)
      .pipe(
        tap(res => {   //something similar to mapping 
          this.storage.set(JWT_TOKEN, res['token']); //to set the token for the storage 
          this.user = this.jwtHelper.decodeToken(res['token']);
          this.authenticationState.next(true);  //to set the authentication state to true 
        }),
        catchError(e => {
          this.showErrorMessage(e.error.message);  //to show the alert box
          throw new Error(e);
        })
      );
    }

    signUp(details){     //signup method for http post request 
      return this.http.post(`${this.url}/user/signUp`, details).pipe(
        catchError(e => {
          this.showErrorMessage(e.error.message); //to show the alert box 
          throw new Error(e);
        })
      );
    }

    logout(){
      this.storage.remove(JWT_TOKEN).then(() => {
        this.authenticationState.next(false);  //to set the athentication state to false 
        this.router.navigate(['signin']);   //navigate the user back to signin screen
      });
    }

    isAuthenticated(){
      return this.authenticationState.value; //for authGuard check
    }

    showErrorMessage(message){
      let alert = this.alertController.create({
        message: message,
        header: 'Message from Fresty',
        buttons: ['OK']
      });
      alert.then(alert => alert.present());
    }
    

    

}
