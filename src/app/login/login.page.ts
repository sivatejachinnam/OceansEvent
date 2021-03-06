import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder

  ) { }

  validations_form: FormGroup;
  errorMessage = '';
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  loginUser(value){
    if(value.email == 'admin@admin.com' && value.password == 'adminpassword'){
      this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.navCtrl.navigateForward('/admindashboard');
      localStorage.setItem('role', 'admin')
      this.errorMessage = '';
    }, err => {
      this.errorMessage = err.message;
    });
    }else{
      this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.navCtrl.navigateForward('/dashboard');
      localStorage.setItem('role', 'user')
      this.errorMessage = '';
    }, err => {
      this.errorMessage = err.message;
    });

    }

  }
  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

}
