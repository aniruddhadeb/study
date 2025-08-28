import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { ExcelRow } from '../store/study.models';

@Injectable({
  providedIn: 'root',
})
export class ExcelDbservice extends Dexie {
  excelData!: Table<ExcelRow, number>;

  constructor() {
    super('ExcelDB');
    this.version(1).stores({
      excelData: '++id',
    });
  }

  async saveRows(rows: ExcelRow[]) {
    await this.excelData.bulkAdd(rows);
  }

  async getAllRows() {
    return this.excelData.toArray();
  }

  async clearRows() {
    return this.excelData.clear();
  }

  async searchByField(field: string, value: any) {
    return this.excelData.filter((row) => row[field] === value).toArray();
  }
}
