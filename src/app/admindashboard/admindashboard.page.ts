import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import * as XLSX from 'xlsx';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.page.html',
  styleUrls: ['./admindashboard.page.scss'],
})
export class AdmindashboardPage {
  userList = [];
  wbout;
  blob;
  emailIdList = [];
  usercount = 0
  foodvalue
  foodpref=[]
  users = this.afs.firestore.collection('users');
  constructor(
    public afs: AngularFirestore,
    public navCtrl: NavController,
    private authService: AuthenticateService,
  ) { }
  ngOnInit() {
    this.users.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.emailIdList.push(doc.id);
        this.usercount++
        // console.log(doc.id, doc.data());
         this.foodpref = doc.data().foodpreferences
        // console.log(this.foodpref);
        this.foodvalue=''
        this.foodpref.forEach((food) => {
            this.foodvalue += food+ ", " 
        })
        // console.log(this.foodvalue)
        let mergeObject = doc.data()
        //mergeObject = doc.data()
        mergeObject['foodpreferences'] = this.foodvalue
        this.userList.push(mergeObject);
        // this.userList.push({foodpreferences:this.foodvalue});
        console.log(this.userList) 
      })
    })
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
  userDetails(emailId){
    this.navCtrl.navigateForward(emailId);
  }
  exportData(){
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.userList)
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let date = 'OceansEvent' + new Date().toLocaleString() + '.xlsx'
    XLSX.writeFile(wb, date);
  }
}
