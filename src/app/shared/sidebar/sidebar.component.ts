import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private authServices: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onCerrar() : void {
    this.authServices.logout()
    .then( () => {

      this.router.navigate(['/login']);
      
    });
  }

}
