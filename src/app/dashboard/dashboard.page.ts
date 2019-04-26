import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  inputName: string;
  inputEmpId: string;
  inputGender: string;
  inputTransport: string;
  inputTshirtsize: string;
  foodpref=[]

  usermail
  username
  userid
  usergender
  usertransport
  userfoodpref = []
  usertshirtsize
  sizechart
  veg:boolean
  Nonveg:boolean
  AB:boolean
  NAB:boolean
  isDisplayImage: boolean = false;
  toast: Promise<void>;
  firebaseService: any;
  toastCtrl: any;
  resetFields: any;
  users = this.afs.firestore.collection('users');
  // userForm: FormGroup
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public toastController: ToastController,
    // public emailComposer: EmailComposer,
    private file: File,
    public afd: AngularFireDatabase,
    public afs: AngularFirestore,
    // private fb: FormBuilder,
    // private fc: FormControl
  ) {}
  ngOnInit(){
    // this.userForm = this.fb.group({
    //   username:  '',
    //   userid: '',
    //   usergender: '',
    //   usertransport: '',
    //   foodVeg: '',
    //   foodAB: '',
    //   foodNonVeg: '',
    //   foodNAB: '',
    //   usertshirtsize: ''
    // })

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      console.log(this.userEmail)
    } else {
      this.navCtrl.navigateBack('');
    }
    this.afs.collection('users').doc(this.userEmail).get().subscribe(doc => {
      console.log("document", doc.data())
      this.username = doc.data().name
      this.userid = doc.data().empid
      this.usergender = doc.data().gender
      this.usertransport = doc.data().transport
      this.userfoodpref = doc.data().foodpreferences
      this.usertshirtsize = doc.data().tshitsize

      console.log("user pref food", this.userfoodpref)
      this.userfoodpref.forEach((ele) => {
        console.log("elements foods", ele)
        switch (ele) {
          case 'veg' : {
            this.veg = true;
            break;
          }
          case 'Non veg' : {
            this.Nonveg = true;
            break;
          }
          case 'Alcholic Beverages' : {
            this.AB = true;
            break;
          }
          case 'Non Alcholic Beverages' : {
            this.NAB = true;
            break;
          }
        }
      });
    });
  }
  userDetails(userEmail) {
  this.afs.collection('users').doc(userEmail).set({
    email:userEmail,
    name: this.username,
    empid: this.userid,
    gender: this.usergender,
    transport: this.usertransport,
    tshitsize: this.usertshirtsize,
    foodpreferences:this.foodpref
  }); 
    this.toast = this.toastController.create({
      message: 'Details Submited successfully',
      duration: 2000,
      color: 'success'
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
    this.navCtrl.navigateForward(userEmail);
  }
  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }
  userName ( event: any ) {
    this.inputName = event.target.value;
    console.log(this.inputName);
  }
  userId ( event: any ) {
    this.inputEmpId = event.target.value;
    console.log(this.inputEmpId);
  }
  gender ( event: any ) {
    this.inputGender = event.target.value;
    console.log(this.inputGender);
  }
  updateVeg(){
    // console.log('Veg:',this.inputVeg);
    if(this.veg){
      this.foodpref.push('veg')
      
    }else{
      this.foodpref.splice(this.foodpref.indexOf('veg'), 1)
    }
    console.log("food pref", this.foodpref)
  }
  updateNonVeg(){
    // console.log('Non Veg:',this.inputNonVeg);
    if(this.Nonveg){
      this.foodpref.push('Non veg')
      
    }else{
      this.foodpref.splice(this.foodpref.indexOf('Non veg'), 1)
    }
    console.log("food pref", this.foodpref)
  }
  updateAB(){
    // console.log('Alcholic Beverages:',this.inputAB);
    if(this.AB){
      this.foodpref.push('Alcholic Beverages')
      
    }else{
      this.foodpref.splice(this.foodpref.indexOf('Alcholic Beverages'), 1)
    }
    console.log("food pref", this.foodpref)
  }
  updateNAB(){
    // console.log('NAB:' ,this.inputNAB);
    if(this.NAB){
      this.foodpref.push('Non Alcholic Beverages')
    }else{
      this.foodpref.splice(this.foodpref.indexOf('Non Alcholic Beverages'), 1)
    }
    console.log("food pref", this.foodpref)
  }
  transport ( event: any ) {

    this.inputTransport = event.target.value;
    console.log(this.inputTransport);

  }
  tshirtSize ( event: any ) {
    this.inputTshirtsize = event.target.value;
    console.log(this.inputTshirtsize);
  }
  displayImage(){
    this.isDisplayImage = true;
  }
}
