import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login',  component: LoginComponent},
  { path: 'signup', component: SignupComponent},  
  {
    path: '',
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module'). then( m => m.IngresoEgresoModule )


  },
 // { path: '',       component: DashboardComponent, children: dashboardRoutes, canActivate: [ AuthGuard]},
  { path: '**',     redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
