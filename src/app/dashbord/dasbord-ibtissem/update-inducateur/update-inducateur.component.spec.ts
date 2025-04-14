import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInducateurComponent } from './update-inducateur.component';

describe('UpdateInducateurComponent', () => {
  let component: UpdateInducateurComponent;
  let fixture: ComponentFixture<UpdateInducateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateInducateurComponent]
    });
    fixture = TestBed.createComponent(UpdateInducateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
