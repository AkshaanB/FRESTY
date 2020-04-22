import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-members-area',
  templateUrl: './members-area.page.html',
  styleUrls: ['./members-area.page.scss'],
})
export class MembersAreaPage implements OnInit {

  data = '';
 
  constructor(private authService: AuthService, private storage: Storage, 
    private toastController: ToastController) { }
 
  ngOnInit() {
  }
 
  loadSpecialInfo() {
    this.authService.getSpecialData().subscribe(res => {
      this.data = res['message'];
    });
  }
 
  logout() {
    this.authService.logout();
  }
 
  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');
 
    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }
 
}
