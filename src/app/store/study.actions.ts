import { createAction, props } from "@ngrx/store";
import { EmployeesData, Person } from "./study.models";

export const personAddAction = createAction(
  '[Person] Add',
  props<{ person: Person }>()
);

export const personDeleteAction = createAction(
  '[Person] Delete',
  props<{ id: string }>()
);

export const personUpdateAction = createAction(
  '[Person] Update',
  props<{ id: string, age: number, address: string, phone: string, email: string }>()
);

export const loadEmployeesAction = createAction(
  '[Person] Load Employees',
  props<{ employees: EmployeesData[] }>()
);

export const searchResultAction = createAction(
  '[Search] Load Result',
  props<{ searchResult: any[] }>()
);


