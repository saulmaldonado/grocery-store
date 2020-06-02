import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate() {
    return this.auth.user$
      .pipe(switchMap((user) => this.userService.getUser(user.uid)))
      .pipe(map((user) => user.isAdmin));
  }
}
