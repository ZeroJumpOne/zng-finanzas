import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
    
    loginForm!: FormGroup;
  
    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        
    }
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
  
    acceso(): void {
        if (this.loginForm.invalid) { return; }

        //Espera, swal error auto cierra
        Swal.fire({
            title: 'Espere por favor',
            didOpen: () => {
              Swal.showLoading(null);
            }
        });
        
        
        const { email, password } = this.loginForm.value;
    
        this.auth.loginUsuario(email, password )
        .then( rsp => {
            Swal.close();
            this.router.navigate(['/']);            
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              });
        });
    }
}