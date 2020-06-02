import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private fbAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user$ = fbAuth.user;
  }

  redirect(): Observable<boolean> {
    return from(this.fbAuth.getRedirectResult()).pipe(
      map((res) => {
        if (res.user) {
          return true;
        } else {
          return false;
        }
      }),
      first()
    );
  }

  login() {
    this.fbAuth.signInWithRedirect(new auth.GoogleAuthProvider());
    const redirectUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', redirectUrl);
  }

  logout() {
    this.fbAuth.signOut();
  }
}
