import { TestBed, inject } from '@angular/core/testing';

import { Crud<%= entidad.capitalize %>Service } from './crud-<%= entidad.uncapitalize %>.service';

describe('Crud<%= entidad.capitalize %>Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Crud<%= entidad.capitalize %>Service]
    });
  });

  it('should be created', inject([Crud<%= entidad.capitalize %>Service], (service: Crud<%= entidad.capitalize %>Service) => {
    expect(service).toBeTruthy();
  }));
});
