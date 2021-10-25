import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalizeComponent } from './nationalize.component';

describe('NationalizeComponent', () => {
  let component: NationalizeComponent;
  let fixture: ComponentFixture<NationalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
