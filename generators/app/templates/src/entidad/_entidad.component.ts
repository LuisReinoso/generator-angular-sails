import { Component, OnInit } from '@angular/core';
import { <%= entidad.capitalize %>Service } from './servicios/<%= entidad.uncapitalize %>.service';
import { Observable } from 'rxjs/Observable';
import { I<%= entidad.capitalize %> } from '@app/shared/modelos/<%= entidad.uncapitalize %>.model';
import { map } from 'rxjs/operators';
import { Logger } from '@app/core';
import { of } from 'rxjs/observable/of';
import { remove } from 'lodash';
import { MessageService } from 'primeng/components/common/messageservice';

const log = new Logger('<%= entidad.capitalize %>');

@Component({
  selector: 'app-<%= entidad.uncapitalize %>',
  templateUrl: './<%= entidad.uncapitalize %>.component.html',
  styleUrls: ['./<%= entidad.uncapitalize %>.component.scss'],
  providers: [<%= entidad.capitalize %>Service]
})
export class <%= entidad.capitalize %>Component implements OnInit {

  <%= entidad.uncapitalize %>Crud: Observable<I<%= entidad.capitalize %>>;
  <%= entidad.uncapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>: I<%= entidad.capitalize %>;
  resultado<%= entidad.pluralizeCapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>s: I<%= entidad.capitalize %>[];

  constructor(
    private <%= entidad.uncapitalize %>Service: <%= entidad.capitalize %>Service,
    private mensajesService: MessageService
  ) {
    this.<%= entidad.uncapitalize %>Crud = null;
    this.resultado<%= entidad.pluralizeCapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>s = [];
  }

  ngOnInit() {
  }

  busquedaDeSugerencias<%= entidad.capitalize %>(evento: IEventoAutoCompletado) {
    this.<%= entidad.uncapitalize %>Service.buscar<%= entidad.pluralizeCapitalize %>(evento.query)
      .pipe(map(res => res.json()))
      .subscribe(
        data => {
          if (data.registros) {
            this.resultado<%= entidad.pluralizeCapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>s = data.registros;
          } else {
            this.resultado<%= entidad.pluralizeCapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>s = [];
            this.mensajesService.add({
              severity: 'info',
              summary: 'Búsqueda <%= entidad.capitalize %>',
              detail: 'No se ha encontrado <%= entidad.capitalize %>'
            });
          }
        },
        error => {
          const errorRespuesta = JSON.parse(error._body);
          log.error(errorRespuesta);
          this.mensajesService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorRespuesta.mensaje
          });
        }
      );
  }

  actualizar<%= entidad.capitalize %>CrudDesdeBusqueda(evento: I<%= entidad.capitalize %>) {
    this.<%= entidad.uncapitalize %>Crud = of(evento);
  }

  actualizar<%= entidad.capitalize %>CrudDesdeTablaSeleccion(evento: IEventoOnRowSelectTabla) {
    this.<%= entidad.uncapitalize %>Crud = of(evento.data);
  }

  actualizar<%= entidad.capitalize %>CrudDesdeTablaDeseleccion(evento: IEventoOnRowSelectTabla) {
    this.<%= entidad.uncapitalize %>Crud = of(null);
  }

  agregar<%= entidad.capitalize %>EnTabla(evento: I<%= entidad.capitalize %>) {
    this.resultado<%= entidad.pluralizeCapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>s.push(evento);
  }

  eliminar<%= entidad.capitalize %>EnTabla(evento: I<%= entidad.capitalize %>) {
    remove(this.resultado<%= entidad.pluralizeCapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>s, (<%= entidad.uncapitalize %>: I<%= entidad.capitalize %>) => {
      return <%= entidad.uncapitalize %>.id === evento.id;
    });
  }

  actualizar<%= entidad.capitalize %>EnTabla(evento: I<%= entidad.capitalize %>) {
    const indice<%= entidad.capitalize %> = this.resultado<%= entidad.pluralizeCapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>s.findIndex(<%= entidad.uncapitalize %> => {
      return <%= entidad.uncapitalize %>.id === evento.id;
    });

    if (indice<%= entidad.capitalize %> >= 0) {
      this.resultado<%= entidad.pluralizeCapitalize %>Encontrad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>s[indice<%= entidad.capitalize %>] = evento;
    } else {
      log.error('No se ha encontrado <%= entidad.uncapitalize %> para actualizar en tabla');
    }

  }

}

interface IEventoAutoCompletado {
  originalEvent: any;
  query: string;
}

interface IEventoOnRowSelectTabla {
  originalEvent: any;
  data: I<%= entidad.capitalize %>;
  type: string;
}
