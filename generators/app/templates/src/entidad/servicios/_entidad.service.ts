import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '@app/core';

@Injectable()
export class <%= entidad.capitalize %>Service {

  private authHeader: Headers;
  private options: RequestOptions;

  constructor(private http: Http, private autenticacionServicio: AuthenticationService) {
    this.authHeader =  new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + autenticacionServicio.credentials.token
    });

    this.options = new RequestOptions({headers: this.authHeader});
  }

  buscar<%= entidad.pluralizeCapitalize %>(query: string): Observable<Response>  {
    return this.http.get('api/v1/<%= entidad.uncapitalize %>?buscar=' + query, this.options);
  }

}
