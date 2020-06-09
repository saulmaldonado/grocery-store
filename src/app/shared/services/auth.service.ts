import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable, from, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, first, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private fbAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.user$ = fbAuth.user;
  }

  redirect(): Observable<boolean> {
    return from(this.fbAuth.getRedirectResult()).pipe(
      map((res) => {
        if (res.user) {
          this.userService.save(res.user);
          return true;
        } else {
          return false;
        }
      }),
      first()
    );
  }

  login() {
    this.fbAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    const redirectUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', redirectUrl);
  }

  logout() {
    this.fbAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }
}
