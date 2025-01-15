import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/event'; // Replace with your backend API URL
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Store user data and token in localStorage
  storeUserData(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.currentUserSubject.next({ token });
  }

  // Get JWT token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Set the Authorization header with JWT token
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);
  }

  // Check if the user is logged in
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
