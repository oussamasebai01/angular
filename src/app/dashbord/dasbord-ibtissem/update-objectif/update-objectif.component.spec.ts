import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObjectifComponent } from './update-objectif.component';

describe('UpdateObjectifComponent', () => {
  let component: UpdateObjectifComponent;
  let fixture: ComponentFixture<UpdateObjectifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateObjectifComponent]
    });
    fixture = TestBed.createComponent(UpdateObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
