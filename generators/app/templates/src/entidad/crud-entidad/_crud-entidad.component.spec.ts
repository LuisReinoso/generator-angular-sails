import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Crud<%= entidad.capitalize %>Component } from './crud-<%= entidad.uncapitalize %>.component';

describe('Crud<%= entidad.capitalize %>Component', () => {
  let component: Crud<%= entidad.capitalize %>Component;
  let fixture: ComponentFixture<Crud<%= entidad.capitalize %>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Crud<%= entidad.capitalize %>Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Crud<%= entidad.capitalize %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
