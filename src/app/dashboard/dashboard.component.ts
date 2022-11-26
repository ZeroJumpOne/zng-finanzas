import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { FinanzasService } from '../services/finanzas.service';
import * as bussinesActions from '../ingreso-egreso/finanzas.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  bussSubscription!: Subscription;

  constructor(private store: Store<AppState>,
              private finanzasService: FinanzasService) { }

  ngOnInit(): void {


    this.userSubscription = this.store.select('user')
    .subscribe( ({ user }) => {
        //console.log(user.uid);
        if (user.uid != '0') {

          this.bussSubscription = this.finanzasService.initFinanzasListener(user.uid)
          .subscribe( items => {
            //console.log(items);

            this.store.dispatch(bussinesActions.setItems({items: items}));
          });          
        }
    });
  }

  ngOnDestroy(): void {
    this.bussSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();    
  }

}
