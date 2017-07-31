import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id: string;
  listing: any;
  imageUrl: string;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.listing = listing;
      console.log(listing);
    });
  }

}
