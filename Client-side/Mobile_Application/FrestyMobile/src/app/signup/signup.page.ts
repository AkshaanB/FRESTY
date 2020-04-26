import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';

//for network
import { Network } from '@ionic-native/network/ngx';

//for dialogs
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public network: Network, public dialog: Dialogs) 
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
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  signUp() {
    this.authService.signUp(this.userDetailsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.signIn(this.userDetailsForm.value).subscribe();
    });
  }

}
