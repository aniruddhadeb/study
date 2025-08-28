import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeNgrx } from './practice-ngrx';

describe('PracticeNgrx', () => {
  let component: PracticeNgrx;
  let fixture: ComponentFixture<PracticeNgrx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeNgrx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeNgrx);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
