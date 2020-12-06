import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";

import {map, catchError, switchMap} from "rxjs/operators";

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';
import {of} from "rxjs/observable/of";

@Injectable()
export class ToppingsEffect {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService,
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => this.toppingsService.getToppings().pipe(
      map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
      catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
    ))
  )
}
