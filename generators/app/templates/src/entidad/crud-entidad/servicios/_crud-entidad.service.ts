import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '@app/core';
import { I<%= entidad.capitalize %> } from '../../../../shared/modelos/<%= entidad.uncapitalize %>.model';

@Injectable()
export class Crud<%= entidad.capitalize %>Service {

  private authHeader: Headers;
  private options: RequestOptions;

  constructor(private http: Http, private autenticacionServicio: AuthenticationService) {
    this.authHeader =  new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + autenticacionServicio.credentials.token
    });

    this.options = new RequestOptions({headers: this.authHeader});
  }

  crear<%= entidad.capitalize %>(<%= entidad.uncapitalize %>: I<%= entidad.capitalize %>): Observable<Response> {
    return this.http.post('api/v1/<%= entidad.uncapitalize %>', <%= entidad.uncapitalize %>, this.options);
  }

  eliminar<%= entidad.capitalize %>(id<%= entidad.capitalize %>: string): Observable<Response> {
    return this.http.delete('api/v1/<%= entidad.uncapitalize %>/' + id<%= entidad.capitalize %>, this.options);
  }

  actualizar<%= entidad.capitalize %>(<%= entidad.uncapitalize %>: I<%= entidad.capitalize %>): Observable<Response> {
    return this.http.patch('api/v1/<%= entidad.uncapitalize %>/' + <%= entidad.uncapitalize %>.id, <%= entidad.uncapitalize %>, this.options);
  }

  <% relaciones.forEach(function(entidadRelacion) { %>
  buscar<%= entidadRelacion.pluralizeCapitalize %>(query: string): Observable<Response>  {
    return this.http.get('api/v1/<%= entidadRelacion.uncapitalize %>?buscar=' + query, this.options);
  }
  <% }) %>

}
