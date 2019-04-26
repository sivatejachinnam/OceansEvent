import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NavController } from '@ionic/angular/';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {
  users;
  userDetails=[];
  usermail
  username
  userid
  usergender
  usertransport
  userfoodpref=[]
  usertshirtsize
  
  constructor(
    private navCtrl: NavController,
    public afs: AngularFirestore,
    private aroute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.aroute.params.subscribe(id => {
      console.log("get the params id", id)
      this.usermail = id.id
    })
    this.displayDetails();
  }
  back(){
    if(localStorage.getItem('role') == 'admin') {
      this.navCtrl.navigateBack('/admindashboard')
    } else {
      this.navCtrl.navigateBack('/dashboard')
    }
  }
  displayDetails(){
    this.afs.collection('users').doc(this.usermail).get().subscribe(doc => {
      console.log("document", doc.data())
      this.username = doc.data().name
      this.userid = doc.data().empid
      this.usergender = doc.data().gender
      this.usertransport = doc.data().transport
      this.userfoodpref = doc.data().foodpreferences
      this.usertshirtsize = doc.data().tshitsize
    })
  }
}
