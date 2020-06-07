import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../order.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orders$ = this.authService.user$.pipe(
      switchMap((u) => {
        return this.orderService.getOrdersByUser(u.uid).valueChanges();
      })
    );
  }
}
