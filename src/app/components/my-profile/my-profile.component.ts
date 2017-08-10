import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Member } from '../../models/member';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.sass']
})
export class MyProfileComponent implements OnInit {
  uid: string;
  inputMember: Member;
  imageUrl: any;
  myForm: any;
  selectedFiles: FileList;

  constructor(
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.uid = afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.firebaseService.getMemberDetails(this.uid).subscribe(member => {
      this.myForm.patchValue({
        firstName: member.firstName,
        lastName: member.lastName
      });
      if (!!member.image) {
        this.imageUrl = member.image;
      }
    });
  }

  detectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onAddSubmit(value: Member) {
    this.firebaseService.updateMemberDetails(this.uid, value, !!this.selectedFiles ? this.selectedFiles.item(0) : null);
  }

}
