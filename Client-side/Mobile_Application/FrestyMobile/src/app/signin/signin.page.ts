import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],     //user name is required 
      password: ['', [Validators.required, Validators.minLength(6)]]   //password is required with a minimum length of 6 characters
    });
  }

  onSubmit(){
    this.authService.login(this.credentialsForm.value).subscribe();
  }

}
