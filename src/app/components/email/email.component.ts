import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  state: string;
  error: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/members');
      }
    });
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      });
    }
  }

}
