import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//for signin,signup,authentication
import { HttpClientModule } from '@angular/common/http'; //for http requests
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

//For camera 
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

//for network
import { Network } from '@ionic-native/network/ngx';

//for dialogs
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { Base64 } from '@ionic-native/base64/ngx';


export function jwtOptions(storage) {
  return {
    tokenGetter: () => {
      return storage.get('get_token');
    },
    domainArray: ['login-insightful-grysbok-fb.cfapps.eu10.hana.ondemand.com'] //where the nodejs api running
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,         //imported jwt options
        useFactory: jwtOptions,
        deps: [Storage] //dependence for the imported storage
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Network,
    Base64,
    Dialogs,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
