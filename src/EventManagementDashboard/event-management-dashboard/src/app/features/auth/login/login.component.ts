import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.router.navigate(['/events']);

    // this.authService.login(this.username, this.password).subscribe(
    //   (response) => {
    //     // Store the JWT token
    //     this.authService.storeUserData(response.token);
    //     // Redirect to the dashboard or protected page
    //     this.router.navigate(['/events']);
    //   },
    //   (error) => {
    //     this.errorMessage = 'Invalid username or password';
    //   }
    // );
  }
}
