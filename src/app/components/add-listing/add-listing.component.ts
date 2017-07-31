import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Listing } from '../../Listing';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  inputListing: Listing;
  myForm: any;
  selectedFiles: FileList;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      title: [''],
      type: [''],
      image: [''],
      city: [''],
      owner: [''],
      bedrooms: [''],
      price: ['']
    });
  }

  detectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onAddSubmit(value: Listing) {
    this.firebaseService.addListing(value, this.selectedFiles.item(0));
    this.router.navigate(['/listings']);
  }

}
