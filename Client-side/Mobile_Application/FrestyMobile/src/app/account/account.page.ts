import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service'
import { Storage } from '@ionic/storage';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

//For camera 
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

//For http requests
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  capturedImage: string;  //for camera image
  image: any;   //for gallery image

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private toastController: ToastController,
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    private camera: Camera) { }

  ngOnInit() {
  }

  selecteFromGallery(event) {
    this.image = event.target.files[0];
  }



  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Send from Gallery',
        handler: () => {                      //for retrive images from the phone gallery
          const formData = new FormData();
          formData.append('image', this.image);   //to add images to the image file 
          this.http.post('http://imageupload-unexpected-otter-ow.cfapps.eu10.hana.ondemand.com/images', formData).subscribe((response: any) => {
            console.log(response);
          });
        }
      },
      {
        text: 'Scan from Camera and Send',
        handler: () => {           //for native camera
          this.camera.getPicture(this.options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.capturedImage = base64Image;
          }, (err) => {
            console.log(err);
          });
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
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
