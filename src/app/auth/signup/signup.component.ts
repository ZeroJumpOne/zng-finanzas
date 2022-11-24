import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles: [
    ]
})

export class SignupComponent implements OnInit, OnDestroy {
    
    registroForm!: FormGroup;
    loading: boolean = false;
    uiSuscription!: Subscription;
  
    constructor(private fb: FormBuilder, 
                private authService: AuthService, 
                private router: Router,
                private store: Store<AppState>) {
        
    }
  
    ngOnInit(): void {
        this.registroForm = this.fb.group({
            name:     ['', Validators.required],
            email:    ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        this.uiSuscription =  this.store.select('ui').subscribe( ui => {

            this.loading = ui.isLoading;
        });
    }

    ngOnDestroy(): void {
        
        this.uiSuscription.unsubscribe();
    }
  
    crearUsuario(): void {
        
        if ( this.registroForm.invalid ) { return; }

        this.store.dispatch( ui.isLoading() );
    
        const { name, email, password } = this.registroForm.value;
    
        //Espera, swal error auto cierra
        // Swal.fire({
        //     title: 'Espere por favor',
        //     didOpen: () => {
        //         Swal.showLoading(null);
        //     }
        // });
    
        this.authService.crearUsuario(name, email, password )
        .then( credenciales => {

            //Swal.close();
            this.store.dispatch( ui.stopLoading() );
            this.router.navigate(['/']);

        })
        .catch( error => {

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
