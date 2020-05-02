import { MyserviceService } from './../myservice.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  successMessage = '';

  constructor(private _myservice: MyserviceService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required)

    });
   }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return{
            isError: true
          };
        }
      }
    }
    return null;
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
    this._myservice.login(this.loginForm.value)
    .subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.toString());
        this._router.navigate(['/getstarted/product/signin/viewhistory']);
      },
      error => {this.successMessage = 'Please recheck your username and password'}
    );
    }
  }

}
