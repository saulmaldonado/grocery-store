import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService, private userService: UserService) {
    auth.appUser$.subscribe((user: AppUser) => {
      this.appUser = user;
    });
  }

  logout() {
    this.auth.logout();
  }
}
