import { personAdapter, searchResultAdapter } from "./study.reducers";

export const selectAllPersons = personAdapter.getSelectors().selectAll;

export const selectSearchResultState = (state: any) => state.searchData;

export const selectPersonById = (id: string) => (state: any) => {
  return state.personState.entities[id];
}

export const selectPersonByName = (name: string) => (state: any) => {
  return state.personState.entities && Object.values(state.personState.entities).find((person: any) => person.name === name);
}

// export const selectSearchResult = (state: any) => {
//   return state.searchData.entities && Object.values(state.searchData.entities);
// }

export const {
  selectAll: selectAllSearchResults
} = searchResultAdapter.getSelectors(selectSearchResultState);