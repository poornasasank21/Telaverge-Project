import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(){
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        response => {
          localStorage.setItem('user_id', response.user_id);
          
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error => {
          console.error(error);
          this.snackBar.open('Invalid username or password', 'Dismiss', {
            duration: 3000, 
          });
        }
      );
  }
}
