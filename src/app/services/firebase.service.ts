import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Listing } from '../Listing';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';

firebase.initializeApp(environment.firebase);

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<any []>;
  listing: FirebaseObjectObservable<any>;
  private basePath: string;
  private uploadTask: firebase.storage.UploadTask;

  constructor(public db: AngularFireDatabase) {
    this.basePath = '/uploads';
    this.listings = this.db.list('/list/listings') as FirebaseListObservable<Listing[]>;
  }

  getListings() {
    return this.listings;
  }

  getListingDetails(id) {
    this.listing = this.db.object('list/listings/' + id) as FirebaseObjectObservable<Listing>;
    return this.listing;
  }

  addListing(listing: Listing, selectedFile: File) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${selectedFile.name}`).put(selectedFile);

    this.uploadTask.on('value',
      (snapshot) =>  {
        // upload success
        listing.image = selectedFile.name;
        return this.listings.push(listing);
      },
      (error) => {
        // upload failed
        console.log(error);
      }
    );
  }
}
