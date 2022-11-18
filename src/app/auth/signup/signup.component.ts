import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });
  }

  crearUsuario(): void {
    console.log(this.registroForm);
    console.log(this.registroForm.valid);
    console.log(this.registroForm.value);
  }

}
