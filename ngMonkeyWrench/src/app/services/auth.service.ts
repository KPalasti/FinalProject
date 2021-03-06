import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError, Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl = 'http://localhost:8085/';
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    // Make credentials
    const credentials = this.generateBasicAuthCredentials(username, password);
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    // create request to authenticate credentials
    return this.http
      .get(this.baseUrl + 'authenticate', httpOptions)
      .pipe(
        tap((res) => {
          localStorage.setItem('credentials' , credentials);
          return res;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('Invalid username/password')
          );
        })
      );
  }

  showUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}api/username/${username}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
            'Authservice.showUsername(): error retrieving user by username: ' + err
          )
        );
      })
    );
  }

  doWithLoggedInUser(onGet: Function, subscribeTo = false) {
    const username = this.getLoggedInUsername();
    if (username) {
      if (subscribeTo) {
        this.showUsername(username).subscribe(
          {
            next: (user) => {onGet(user).subscribe()},
            error: (error) => {
              console.error("AuthService: doWithLoggedInUser(): Encountered error");
              console.log(error);
            }
          }
        );
      } else {
        this.showUsername(username).subscribe(
          {
            next: (user) => {onGet(user)},
            error: (error) => {
              console.error("AuthService: doWithLoggedInUser(): Encountered error");
              console.log(error);
            }
          }
        );
      }
    } else {
      console.log("AuthService: doWithLoggedInUser(): No current user found");
      if (subscribeTo) {
        onGet(undefined).subscribe();

      } else {
        onGet(undefined);

      }
    }
  }

  register(user: User) {
    // create request to register a new account
    return this.http.post(this.baseUrl + 'register', user)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('AuthService.register(): error registering user.')
        );
      })
    );
  }

  logout() {
    localStorage.removeItem('credentials');
  }

  checkLogin() {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  getLoggedInUsername(): string | null {
    const credentials = this.getCredentials();
    let username = null;
    if (credentials) {
      const decodedCredentials = atob(credentials);
      username = decodedCredentials.split(":")[0];
    }

    return username;
  }

  generateBasicAuthCredentials(username: string, password: string) {
    return btoa(`${username}:${password}`);
  }

  getCredentials() {
    return localStorage.getItem('credentials');
  }

  getBasicHttpOptions() {
    const credentials = this.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return httpOptions;
  }
}
