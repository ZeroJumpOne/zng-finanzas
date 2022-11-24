import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
    
    loginForm!: FormGroup;
    loading: boolean = false;
    uiSubscription!: Subscription;
  
    constructor(private fb: FormBuilder, 
                private auth: AuthService, 
                private router: Router,
                private store: Store<AppState>) {
        
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.uiSubscription = this.store.select('ui').subscribe( ui => {

            this.loading = ui.isLoading;

            //console.log('loading sub')
        })
    }

    ngOnDestroy(): void {
        this.uiSubscription.unsubscribe();
    }
  
    acceso(): void {
        if (this.loginForm.invalid) { return; }

        this.store.dispatch( ui.isLoading() );

        //Espera, swal error auto cierra
        // Swal.fire({
        //     title: 'Espere por favor',
        //     didOpen: () => {
        //       Swal.showLoading(null);
        //     }
        // });
        
        
        const { email, password } = this.loginForm.value;
    
        this.auth.loginUsuario(email, password )
        .then( rsp => {
            //Swal.close();
            this.store.dispatch( ui.stopLoading() );
            this.router.navigate(['/']);            
        })
        .catch(error => {
            
            this.store.dispatch( ui.stopLoading() );

            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              });
        });
    }
}