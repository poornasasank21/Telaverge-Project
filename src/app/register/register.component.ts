
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  

  constructor(private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(){
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.router.navigate(['/']);
    }
  }

  register() {
     if ( this.password.length > 6  ){
      if(this.email.includes('@')){
            this.authService.register(this.username, this.password, this.email,this.name)
              .subscribe(
                response => {
                  console.log(response);
                  localStorage.setItem('user_id', response.user_id);
                  this.router.navigate(['/']).then(() => {
                    window.location.reload();
                  });
                },
                error => {
                  console.error(error);
                  this.snackBar.open(error.error.message, 'Dismiss', {
                    duration: 3000, 
                  });
                }
              );
            }
            else{
              this.snackBar.open("Invalid Email ID", 'Error', {
                duration: 3000, 
              });
            }
          }
    else
    {
      this.snackBar.open("Password Length should be greater than 6", 'Error', {
        duration: 3000, 
      });
    }

  }
  
}
