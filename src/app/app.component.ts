import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shortlink-app';
  user_id = '';

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id') as string;
  }

  logout() {
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
