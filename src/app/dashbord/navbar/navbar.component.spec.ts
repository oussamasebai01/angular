import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponentWm } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponentWm;
  let fixture: ComponentFixture<NavbarComponentWm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponentWm]
    });
    fixture = TestBed.createComponent(NavbarComponentWm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
