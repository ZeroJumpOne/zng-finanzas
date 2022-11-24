import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles: [
    ]
})

export class SignupComponent implements OnInit {
    
    registroForm!: FormGroup;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        
    }
  
    ngOnInit(): void {
        this.registroForm = this.fb.group({
            name:     ['', Validators.required],
            email:    ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }
  
    crearUsuario(): void {
        
        if ( this.registroForm.invalid ) { return; }
    
        const { name, email, password } = this.registroForm.value;
    
        //Espera, swal error auto cierra
        Swal.fire({
            title: 'Espere por favor',
            didOpen: () => {
                Swal.showLoading(null);
            }
        });
    
        this.authService.crearUsuario(name, email, password )
        .then( credenciales => {
            Swal.close();
            this.router.navigate(['/']);
        })
        .catch( error => {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        });
    }
}
