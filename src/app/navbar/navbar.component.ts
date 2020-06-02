import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}
  public isOpen: boolean = false;

  open() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {}
}
