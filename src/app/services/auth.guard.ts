import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {

    //console.log('entrando canActive');
    //console.log('auth',this.authService);

    return this.authService.isAuth()
    .pipe(
      tap( estado => {
        console.log(estado);

        if (!estado) {
          this.router.navigate(['/login']);
        }

      })
    );
  }
  
}
