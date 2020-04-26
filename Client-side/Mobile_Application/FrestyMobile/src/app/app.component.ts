import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './authentication/auth.service';
import { Router } from '@angular/router';

//for dialogs
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,   //for subscribe purposes
    private router: Router,
    public dialog: Dialogs
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.authenticationState.subscribe(userState => {
        if(userState){
          this.router.navigate(['account']); //if the user is a memeber the user can access the page 
        }else{
          this.dialog.alert("Please signin to continue");
        }
      })
    });
  }

  
}
