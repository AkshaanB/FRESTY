import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service'
import { Storage } from '@ionic/storage';
import { ActionSheetController, ToastController, AlertController } from '@ionic/angular';

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

  imageData;  //for camera image
  image: any;   //for gallery image

  //properties for the native camera 
  options: CameraOptions = {
    quality: 100,
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
          this.http.post('https://imageupload-unexpected-otter-ow.cfapps.eu10.hana.ondemand.com/images', formData).subscribe((response: any) => {
            console.log(response);

          });
          this.displayToast("Image uploaded");
        }
      },
      {
        text: 'Scan from Camera and Send',
        handler: () => {           //for native camera
          this.camera.getPicture(this.options).then((imageData) => {

            // imageData as data url
            this.imageData = imageData;
            console.log("value : " + imageData);

            const imageBlob = this.convertToBlob(this.imageData);  //to convert data url to bolb object
            console.log("new Value : " + imageBlob);

            const formData = new FormData();
            formData.append('image', imageBlob);
            this.http.post('https://imageupload-unexpected-otter-ow.cfapps.eu10.hana.ondemand.com/images', formData).subscribe((response: any) => {
              console.log(response);

            });
            this.displayToast('Image uploaded');
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

  //to convert the base64 image to blobfile
  convertToBlob(dataurl) {
    const byteString = window.atob(dataurl);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  //logout function
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

  //to display a toast message 
  async displayToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

}
