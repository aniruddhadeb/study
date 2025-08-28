import { Component, effect, OnInit, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  personDeleteAction,
  personAddAction,
  personUpdateAction,
  loadEmployeesAction,
  searchResultAction,
} from '../store/study.actions';
import { selectAllSearchResults, selectPersonById, selectPersonByName } from '../store/study.selectors';
import { PracticeData } from '../services/practice-data';
import { ExcelDbservice } from '../services/exceldbservice';
import * as XLSX from 'xlsx';
import { ExcelRow } from '../store/study.models';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-practice-ngrx',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AgGridAngular],
  templateUrl: './practice-ngrx.html',
  styleUrl: './practice-ngrx.scss',
})
export class PracticeNgrx implements OnInit {
  personForm = signal<FormGroup>({} as FormGroup);
  personDeleteForm = signal<FormGroup>({} as FormGroup);
  personUpdateForm = signal<FormGroup>({} as FormGroup);
  personSearchForm = signal<FormGroup>({} as FormGroup);
  excelDbSearchForm = signal<FormGroup>({} as FormGroup);

  personFormValue!: Signal<any>;
  personDeleteFormValue!: Signal<any>;
  personUpdateFormValue!: Signal<any>;
  personSearchFormValue!: Signal<any>;
  excelDbSearchFormValue!: Signal<any>;

  results$!: Observable<any[]>;

  columnDefs = [
    { field: 'id' },
    { field: 'name' },
    { field: 'age' },
    { field: 'address' },
    { field: 'sex' },
    { field: 'phone' },
    { field: 'email' },
  ];

  constructor(
    private store: Store, 
    private fb: FormBuilder, 
    private practiceData: PracticeData,
    private excelDb: ExcelDbservice
  ) {
    this.personForm.set(
      this.fb.group({
        personName: new FormControl(''),
        personAge: new FormControl(0),
        personAddress: new FormControl(''),
        sex: new FormControl(''),
        personPhone: new FormControl(''),
        personEmail: new FormControl(''),
        empId: new FormControl(''),
      })
    );
    this.personFormValue = toSignal(this.personForm().valueChanges, {
      initialValue: this.personForm().value,
    });

    this.personDeleteForm.set(
      this.fb.group({
        deleteId: new FormControl(''),
      })
    );
    this.personDeleteFormValue = toSignal(
      this.personDeleteForm().valueChanges,
      {
        initialValue: this.personDeleteForm().value,
      }
    );

    this.personSearchForm.set(
      this.fb.group({
        searchId: new FormControl(''),
        searchName: new FormControl(''),
      })
    );
    this.personSearchFormValue = toSignal(
      this.personSearchForm().valueChanges,
      {
        initialValue: this.personSearchForm().value,
      }
    );

    this.excelDbSearchForm.set(
      this.fb.group({
        searchField: new FormControl(''),
        searchValue: new FormControl(''),
      })
    );
    this.excelDbSearchFormValue = toSignal(
      this.excelDbSearchForm().valueChanges,
      {
        initialValue: this.excelDbSearchForm().value,
      }
    );

    this.personUpdateForm.set(
      this.fb.group({
        updateId: new FormControl(''),
        updateAge: new FormControl(0),
        updateAddress: new FormControl(''),
        updatePhone: new FormControl(''),
        updateEmail: new FormControl(''),
      })
    );
    this.personUpdateFormValue = toSignal(
      this.personUpdateForm().valueChanges,
      {
        initialValue: this.personUpdateForm().value,
      }
    );
    
  }
  onSubmit() {
    const person = this.personFormValue();
    this.store.dispatch(personAddAction({ person }));
  }

  onDeleteSubmit() {
    const person = this.personDeleteFormValue();
    this.store.dispatch(personDeleteAction({ id: person.id }));
  }

  onUpdateSubmit() {
    const personUpdate = this.personUpdateFormValue();
    this.store.dispatch(
      personUpdateAction({
        id: personUpdate.id,
        age: personUpdate.age,
        address: personUpdate.address,
        phone: personUpdate.phone,
        email: personUpdate.email,
      })
    );
  }

  onSearchSubmit() {
    const person = this.personSearchFormValue();
    if (!person.id && person.name) {
      this.store
        .select(selectPersonByName(person.name))
        .subscribe((res) => {
          console.log('res', res);
        });
      return;
    } else if (person.id && !person.name) {
      this.store
        .select(selectPersonById(person.id))
        .subscribe((res) => {
          console.log('res', res);
        });
      return;
    } else if (!person.id && !person.name) {
      return;
    }
  }

  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;

    const file = target.files[0];
    const arrayBuffer = await file.arrayBuffer(); // ✅ ArrayBuffer API
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Convert first sheet to JSON
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: null }) as ExcelRow[];

    console.log('Parsed Excel JSON:', jsonData);

    // Clear old and save new
    await this.excelDb.clearRows();
    await this.excelDb.saveRows(jsonData);
    console.log('Saved to IndexedDB via Dexie ✅');
  }

  async loadFromDb() {
    const rows = await this.excelDb.getAllRows();
    console.log('Fetched from IndexedDB:', rows);
  }

  onExcelDbSearchSubmit() {
    const { searchField, searchValue } = this.excelDbSearchFormValue();
    if (!searchField || !searchValue) return;
    this.excelDb.searchByField(searchField, searchValue).then((results) => {
      this.store.dispatch(searchResultAction({ searchResult: results }));
    });
  }

  showGrid() {
    this.results$ = this.store.select(selectAllSearchResults);
  }

  ngOnInit(): void {
    this.practiceData.getEmployeesData().subscribe((employees) => {
      if (employees && employees.length) {
        this.store.dispatch(loadEmployeesAction({ employees }));
      }
    });
  }
}
