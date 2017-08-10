import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Member } from '../models/member';
import { environment } from '../../environments/environment';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase';

firebase.initializeApp(environment.firebase);

@Injectable()
export class FirebaseService {
  members: FirebaseListObservable<any[]>;
  member: FirebaseObjectObservable<Member>;
  private basePath: string;
  private uploadTask: firebase.storage.UploadTask;

  constructor(
    public db: AngularFireDatabase,
    public flashMessage: FlashMessagesService
  ) {
    this.basePath = '/uploads';
  }

  getMemberDetails(id) {
    this.member = this.db.object('members/' + id) as FirebaseObjectObservable<Member>;
    return this.member;
  }

  updateMemberDetails(uid: string, member: Member, selectedFile?: File) {
    if (!!selectedFile) {
      const storageRef = firebase.storage().ref();
      this.uploadTask = storageRef.child(`${this.basePath}/${uid}/${selectedFile.name}`).put(selectedFile);

      this.uploadTask.then(
        (snapshot) =>  {
          // upload success
          member.image = snapshot.downloadURL;
          this.getMemberDetails(uid).update(member);
          this.handleSuccess();
        },
        (error) => {
          // upload failed
          this.handleError(error);
        }
      );
    } else {
      this.getMemberDetails(uid).update(member);
      this.handleSuccess();
    }
  }

  getFileUrl(uid: string, fileName: string) {
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${this.basePath}/${uid}/${fileName}`).getDownloadURL();
  }

  listMembers() {
    this.members = this.db.list('members') as FirebaseListObservable<any[]>;
    return this.members;
  }

  handleSuccess() {
    this.flashMessage.show('The changes are saved.',
    {cssClass: 'alert-success', timeout: 3000});
  }

  handleError(error: Error) {
    this.flashMessage.show(error.message,
    {cssClass: 'alert-danger', timeout: 3000});
  }
}
