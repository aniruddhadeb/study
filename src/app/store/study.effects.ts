import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadEmployeesAction, searchResultAction } from './study.actions';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class StudyEffects {
  employeesEffects$;

  constructor(private actions$: Actions, private store: Store) {
    this.employeesEffects$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(loadEmployeesAction),
          tap(() => console.log('Employees data loaded'))
        ),
      { dispatch: false }
    );
  }
}
