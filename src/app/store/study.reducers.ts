import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { personDeleteAction, personAddAction, personUpdateAction, loadEmployeesAction, searchResultAction } from "./study.actions";
import { EmployeesData, Person } from "./study.models";

export const selectPersonState = (state: Person) => state.id;

export const selectEmployeeState = (state: EmployeesData) => state.id;

export const selectSearchResultState = (state: any) => state.id;

export const personAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
    selectId: selectPersonState,
});

export const employeesAdapter: EntityAdapter<EmployeesData> = createEntityAdapter<EmployeesData>({
    selectId: selectEmployeeState,
});

export const searchResultAdapter: EntityAdapter<any> = createEntityAdapter<any>({
    selectId: selectSearchResultState,
});

export const personInitialState: EntityState<Person> = personAdapter.getInitialState();

export const employeesInitialState: EntityState<EmployeesData> = employeesAdapter.getInitialState();

export const initialsearchResultState: EntityState<any> = searchResultAdapter.getInitialState();

export const personReducer = createReducer(
    personInitialState,
    on(personAddAction, (state, { person }) => ({
        ...state,
        ...personAdapter.upsertOne(person, state),
    })),
    on(personDeleteAction, (state, { id }) => ({
        ...state,
        ...personAdapter.removeOne(id, state),
    })),
    on(personUpdateAction, (state, { id, age, address, phone, email }) => ({
        ...state,
        ...personAdapter.updateOne({id, changes: { age, address, phone, email }}, state),
    })),
);

export const employeesReducer = createReducer(
    employeesInitialState,
    on(loadEmployeesAction, (state, { employees }) => ({
        ...state,
        ...employeesAdapter.upsertMany(employees, state),
    })),
);

export const searchResultDbReducer = createReducer(
    initialsearchResultState,
    on(searchResultAction, (state, { searchResult }) => {
        const clearedState = searchResultAdapter.removeAll(state);
        return searchResultAdapter.upsertMany(searchResult, clearedState);
    }),
);

