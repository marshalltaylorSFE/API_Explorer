import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingInfoComponent } from './programming-info.component';

describe('ProgrammingInfoComponent', () => {
  let component: ProgrammingInfoComponent;
  let fixture: ComponentFixture<ProgrammingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
