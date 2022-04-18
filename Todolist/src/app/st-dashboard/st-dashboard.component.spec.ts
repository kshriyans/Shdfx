import { ComponentFixture, TestBed } from '@angular/core/testing';

import { stDashboardComponent } from './st-dashboard.component';

describe('stDashboardComponent', () => {
  let component: stDashboardComponent;
  let fixture: ComponentFixture<stDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ stDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(stDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
