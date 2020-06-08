import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'app/shared/models/ShoppingCart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((user: AppUser) => {
      this.appUser = user;
    });

    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
