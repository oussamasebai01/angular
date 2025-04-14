import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNonConfComponent } from './update-non-conf.component';

describe('UpdateNonConfComponent', () => {
  let component: UpdateNonConfComponent;
  let fixture: ComponentFixture<UpdateNonConfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNonConfComponent]
    });
    fixture = TestBed.createComponent(UpdateNonConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
