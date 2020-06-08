import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';

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
