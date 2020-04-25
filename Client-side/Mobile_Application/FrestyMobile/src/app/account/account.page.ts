import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service'
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('get_token');

    let toast = this.toastController.create({
      message: 'JWT was successfully removed',
      duration: 4000
    });
    toast.then(toast => toast.present());
  }

}
