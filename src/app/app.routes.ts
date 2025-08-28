import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'practice-ngrx',
    loadComponent: () => import('./practice-ngrx/practice-ngrx').then(m => m.PracticeNgrx)
}];
