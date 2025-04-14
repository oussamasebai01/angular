import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAxeComponent } from './update-axe.component';

describe('UpdateAxeComponent', () => {
  let component: UpdateAxeComponent;
  let fixture: ComponentFixture<UpdateAxeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAxeComponent]
    });
    fixture = TestBed.createComponent(UpdateAxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
