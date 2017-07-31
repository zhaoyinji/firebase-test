import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: string;
  listing: string;
  imageUrl: string;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
