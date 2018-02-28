import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= entidad.capitalize %>Component } from './<%= entidad.uncapitalize %>.component';

describe('<%= entidad.capitalize %>Component', () => {
  let component: <%= entidad.capitalize %>Component;
  let fixture: ComponentFixture<<%= entidad.capitalize %>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%= entidad.capitalize %>Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%= entidad.capitalize %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
