import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';

//for network
import { Network } from '@ionic-native/network/ngx';

//for dialogs
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  userDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,public network: Network,public dialog:Dialogs)
   { 
     this.network.onDisconnect().subscribe(() =>{
       this.dialog.alert("Data connection is blocked");   //to check the network status 
     });
     this.network.onConnect().subscribe(() =>{
       setTimeout(() =>{
         this.dialog.alert("Data connection is allowed");
       },2000);
     });
   }

  ngOnInit() {
    this.userDetailsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],     //user email is required 
      password: ['', [Validators.required, Validators.minLength(6)]]   //password is required with a minimum length of 6 characters
    });
  }

  onSubmit(){
    this.authService.signIn(this.userDetailsForm.value).subscribe(); 
  }

}
