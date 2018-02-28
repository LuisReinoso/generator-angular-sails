import { TestBed, inject } from '@angular/core/testing';

import { <%= entidad.capitalize %>Service } from './<%= entidad.uncapitalize %>.service';

describe('<%= entidad.capitalize %>Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [<%= entidad.capitalize %>Service]
    });
  });

  it('should be created', inject([<%= entidad.capitalize %>Service], (service: <%= entidad.capitalize %>Service) => {
    expect(service).toBeTruthy();
  }));
});
