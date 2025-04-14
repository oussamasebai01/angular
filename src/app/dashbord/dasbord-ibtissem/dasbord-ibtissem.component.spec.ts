import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasbordIbtissemComponent } from './dasbord-ibtissem.component';

describe('DasbordIbtissemComponent', () => {
  let component: DasbordIbtissemComponent;
  let fixture: ComponentFixture<DasbordIbtissemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DasbordIbtissemComponent]
    });
    fixture = TestBed.createComponent(DasbordIbtissemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
