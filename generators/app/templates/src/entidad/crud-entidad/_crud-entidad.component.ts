import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Crud<%= entidad.capitalize %>Service } from './servicios/crud-<%= entidad.uncapitalize %>.service';
import { I<%= entidad.capitalize %> } from './../../../shared/modelos/<%= entidad.uncapitalize %>.model';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Logger } from '@app/core';
<% relaciones.forEach(function(entidadRelacion) { %>import { I<%= entidadRelacion.capitalize %> } from '@app/shared/modelos/<%= entidadRelacion.uncapitalize %>.model';
<% }) -%>
import { remove } from 'lodash';
import { MessageService } from 'primeng/components/common/messageservice';
<% colecciones.forEach(function(entidadColeccion) { %>import { I<%= entidadColeccion.capitalize %> } from '@app/shared/modelos/<%= entidadColeccion.uncapitalize %>.model';
<% }) -%>

const log = new Logger('Crud <%= entidad.capitalize %>');

@Component({
  selector: 'app-crud-<%= entidad.uncapitalize %>',
  templateUrl: './crud-<%= entidad.uncapitalize %>.component.html',
  styleUrls: ['./crud-<%= entidad.uncapitalize %>.component.scss'],
  providers: [Crud<%= entidad.capitalize %>Service]
})
export class Crud<%= entidad.capitalize %>Component implements OnInit {

  // Se actualiza segun cambia el input
  // https://stackoverflow.com/questions/41480210/angular-2-populate-formbuilder-with-data-from-http

  @Input('<%= entidad.uncapitalize %>')
  set cargar<%= entidad.capitalize %>(<%= entidad.uncapitalize %>: I<%= entidad.capitalize %>) {
    this.<%= entidad.uncapitalize %>.next(<%= entidad.uncapitalize %>);
  }

  <% relaciones.forEach(function(entidadRelacion) { %>
  @Input('<%= entidadRelacion.uncapitalize %>')
  set cargar<%= entidadRelacion.capitalize %>(<%= entidadRelacion.uncapitalize %>: I<%= entidadRelacion.capitalize %>) {
    this.<%= entidadRelacion.uncapitalize %>.next(<%= entidadRelacion.uncapitalize %>);
  }
  <% }) -%>

  @Output() <%= entidad.uncapitalize %>Crear: EventEmitter<I<%= entidad.capitalize %>>;
  @Output() <%= entidad.uncapitalize %>Eliminar: EventEmitter<I<%= entidad.capitalize %>>;
  @Output() <%= entidad.uncapitalize %>Actualizar: EventEmitter<I<%= entidad.capitalize %>>;

  <%= entidad.uncapitalize %>: Subject<I<%= entidad.capitalize %>>;
  <%= entidad.uncapitalize %>Seleccionad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>: I<%= entidad.capitalize %>;
  formularioDetalle<%= entidad.capitalize %>: FormGroup;
  <% relaciones.forEach(function(entidadRelacion) { %>
  <%= entidadRelacion.uncapitalize %>Seleccionad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>: I<%= entidadRelacion.capitalize %>;
  resultado<%= entidadRelacion.pluralizeCapitalize %>Encontrad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>s: I<%= entidadRelacion.capitalize %>[];
  <%= entidadRelacion.uncapitalize %>: Subject<I<%= entidadRelacion.capitalize %>>;
  aux<%= entidadRelacion.capitalize %>: I<%= entidadRelacion.capitalize %>;
  <% }) -%>
  <% colecciones.forEach(function(entidadColeccion) { %>
  <%= entidadColeccion.pluralizeUncapitalize %>: I<%= entidadColeccion.capitalize %>[];
  <%= entidadColeccion.uncapitalize %>Seleccionad<% if(entidadColeccion.isFemenino){ %>a<% } else{ %>o<% } %>: I<%= entidadColeccion.capitalize %>;
  isCrud<%= entidadColeccion.capitalize %>Visible: boolean;
  <% }) -%>

  constructor(
    private formBuilder: FormBuilder,
    private crud<%= entidad.capitalize %>Service: Crud<%= entidad.capitalize %>Service,
    private mensajesService: MessageService
  ) {
    this.<%= entidad.uncapitalize %> = new Subject<I<%= entidad.capitalize %>>();
    this.<%= entidad.uncapitalize %>Seleccionad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %> = null;
    this.formularioDetalle<%= entidad.capitalize %> = this.suscribirEstadoInicialDeFormulario<%= entidad.capitalize %>();
    <% relaciones.forEach(function(entidadRelacion) { %>
    this.<%= entidadRelacion.uncapitalize %>Seleccionad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %> = null;
    this.resultado<%= entidadRelacion.pluralizeCapitalize %>Encontrad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>s = [];
    this.<%= entidadRelacion.uncapitalize %> = new Subject<I<%= entidadRelacion.capitalize %>>();
    this.aux<%= entidadRelacion.capitalize %> = null;
    <% }) -%>
    <% colecciones.forEach(function(entidadColeccion) { %>
    this.<%= entidadColeccion.pluralizeUncapitalize %> = [];
    this.<%= entidadColeccion.uncapitalize %>Seleccionad<% if(entidadColeccion.isFemenino){ %>a<% } else{ %>o<% } %> = null;
    this.isCrud<%= entidadColeccion.capitalize %>Visible = false;
    <% }) -%>

    this.<%= entidad.uncapitalize %>Crear = new EventEmitter();
    this.<%= entidad.uncapitalize %>Eliminar = new EventEmitter();
    this.<%= entidad.uncapitalize %>Actualizar = new EventEmitter();
  }

  ngOnInit() {
    this.suscribir<%= entidad.capitalize %>ANuevosValores();
    <% relaciones.forEach(function(entidadRelacion) { %>
    this.<%= entidadRelacion.uncapitalize %>.subscribe(
      data => {
        this.aux<%= entidadRelacion.capitalize %> = data;
        this.formularioDetalle<%= entidad.capitalize %>.get('<%= entidadRelacion.uncapitalize %>')
          .setValue(data, { onlySelf: true});
      },
      error => {
        log.error('Error cargando valor de <%= entidadRelacion.uncapitalize %>');
      }
    );
    <% }) -%>
  }

  suscribirEstadoInicialDeFormulario<%= entidad.capitalize %>(): FormGroup {
    return this.formBuilder.group({
      <% Object.keys(entidad.entity).forEach(function(campo) { %>'<%= campo %>': [null, <% if(entidad.entity[campo].required){ %>Validators.required<% } else{ %>''<% } %>],
      <% }) %>
    });
  }

  suscribir<%= entidad.capitalize %>ANuevosValores(): void {
    this.<%= entidad.uncapitalize %>
      .pipe(
        map((<%= entidad.uncapitalize %>: I<%= entidad.capitalize %>) => {
          // <%= entidad.capitalize %> a cambiado
          if (<%= entidad.uncapitalize %>) {<% Object.keys(entidad.entity).forEach(function(campo) { if(!entidad.entity[campo].collection && !entidad.entity[campo].model ) { %>
            this.formularioDetalle<%= entidad.capitalize %>.get('<%= campo %>')
              .setValue(<%= entidad.uncapitalize %>.<%= campo %>, { onlySelf: true});<% }}) %>

            <% relaciones.forEach(function(entidadRelacion) { %>
            if (this.aux<%= entidadRelacion.capitalize %>) {
              this.formularioDetalle<%= entidad.capitalize %>.get('<%= entidadRelacion.uncapitalize %>')
                .setValue(this.aux<%= entidadRelacion.capitalize %>, { onlySelf: true});
            } else {
              this.formularioDetalle<%= entidad.capitalize %>.get('<%= entidadRelacion.uncapitalize %>')
                .setValue(<%= entidad.uncapitalize %>.<%= entidadRelacion.uncapitalize %>, { onlySelf: true});
            }
            <% }) -%>

            <% colecciones.forEach(function(entidadColeccion) { %>this.<%= entidadColeccion.pluralizeUncapitalize %> = <%= entidad.uncapitalize %>.<%= entidadColeccion.pluralizeUncapitalize %> || [];
            <% }) %>
            this.<%= entidad.uncapitalize %>Seleccionad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %> = <%= entidad.uncapitalize %>;
            this.formularioDetalle<%= entidad.capitalize %>.enable(); // refresca la vista
          } else {
            // Volver al estado ingresar nuevo <%= entidad.uncapitalize %>
            // Observable es null
            this.formularioDetalle<%= entidad.capitalize %> = this.suscribirEstadoInicialDeFormulario<%= entidad.capitalize %>();
            this.formularioDetalle<%= entidad.capitalize %>.reset();
            <% colecciones.forEach(function(entidadColeccion) { %>this.<%= entidadColeccion.pluralizeUncapitalize %> = [];
            <% }) %>
            this.<%= entidad.uncapitalize %>Seleccionad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %> = null;

            <% relaciones.forEach(function(entidadRelacion) { %>
            if (this.aux<%= entidadRelacion.capitalize %>) {
              this.formularioDetalle<%= entidad.capitalize %>.get('<%= entidadRelacion.uncapitalize %>')
                .setValue(this.aux<%= entidadRelacion.capitalize %>, { onlySelf: true});
            }
            <% }) %>
          }
        })
      )
      .subscribe();
  }

  limpiar<%= entidad.capitalize %>(): void {
    this.<%= entidad.uncapitalize %>.next(null);
    this.formularioDetalle<%= entidad.capitalize %> = this.suscribirEstadoInicialDeFormulario<%= entidad.capitalize %>();
    this.formularioDetalle<%= entidad.capitalize %>.reset();
  }

  crear<%= entidad.capitalize %>(formulario<%= entidad.capitalize %>: I<%= entidad.capitalize %>) {
    this.crud<%= entidad.capitalize %>Service.crear<%= entidad.capitalize %>(formulario<%= entidad.capitalize %>)
      .pipe(map(res => res.json()))
      .subscribe(
        data => {
          formulario<%= entidad.capitalize %>.id = data.respuesta.<%= entidad.uncapitalize %>.id;
          this.<%= entidad.uncapitalize %>Crear.emit(formulario<%= entidad.capitalize %>);
          this.<%= entidad.uncapitalize %>.next(formulario<%= entidad.capitalize %>);
          this.mensajesService.add({
            severity: 'success',
            summary: '<%= entidad.name %> cread<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>',
            detail: 'Se ha creado <% if(entidad.isFemenino){ %>la<% } else{ %>el<% } %> <%= entidad.name %>'
          });
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

  eliminar<%= entidad.capitalize %>(formulario<%= entidad.capitalize %>: I<%= entidad.capitalize %>) {
    this.crud<%= entidad.capitalize %>Service.eliminar<%= entidad.capitalize %>(formulario<%= entidad.capitalize %>.id)
      .pipe(map(res => res.json()))
      .subscribe(
        data => {
          this.<%= entidad.uncapitalize %>Eliminar.emit(formulario<%= entidad.capitalize %>);
          this.limpiar<%= entidad.capitalize %>();
          this.mensajesService.add({
            severity: 'success',
            summary: '<%= entidad.name %> eliminad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>',
            detail: 'Se ha eliminado <% if(entidad.isFemenino){ %>la<% } else{ %>el<% } %> <%= entidad.name %>'
          });
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

  actualizar<%= entidad.capitalize %>(formulario<%= entidad.capitalize %>: I<%= entidad.capitalize %>) {
    this.crud<%= entidad.capitalize %>Service.actualizar<%= entidad.capitalize %>(formulario<%= entidad.capitalize %>)
      .pipe(map(res => res.json()))
      .subscribe(
        data => {
          this.<%= entidad.uncapitalize %>Actualizar.emit(formulario<%= entidad.capitalize %>);
          this.mensajesService.add({
            severity: 'success',
            summary: '<%= entidad.name %> actualizad<% if(entidad.isFemenino){ %>a<% } else{ %>o<% } %>',
            detail: 'Se ha actualizado <% if(entidad.isFemenino){ %>la<% } else{ %>el<% } %> <%= entidad.name %>'
          });
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

  <% relaciones.forEach(function(entidadRelacion) { %>
  busquedaDeSugerencias<%= entidadRelacion.pluralizeCapitalize %>(evento: IEventoAutoCompletado) {
    this.crud<%= entidad.capitalize %>Service.buscar<%= entidadRelacion.pluralizeCapitalize %>(evento.query)
    .pipe(map(res => res.json()))
    .subscribe(
      data => {
        if (data.registros) {
          this.resultado<%= entidadRelacion.pluralizeCapitalize %>Encontrad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>s = data.registros;
        } else {
          this.resultado<%= entidadRelacion.pluralizeCapitalize %>Encontrad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>s = [];
          this.mensajesService.add({
            severity: 'info',
            summary: 'Búsqueda <%= entidadRelacion.capitalize %>',
            detail: 'No se ha encontrado <%= entidadRelacion.capitalize %>'
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
  <% }) %>

  <% colecciones.forEach(function(entidadColeccion) { %>
  seleccionar<%= entidadColeccion.capitalize %>DesdeRelacion(indice: number) {
    this.isCrud<%= entidadColeccion.capitalize %>Visible = true;
    this.<%= entidadColeccion.uncapitalize %>Seleccionad<% if(entidadColeccion.isFemenino){ %>a<% } else{ %>o<% } %> = this.<%= entidadColeccion.pluralizeUncapitalize %>[indice];
  }

  crear<%= entidadColeccion.capitalize %>DesdeRelacion() {
    this.isCrud<%= entidadColeccion.capitalize %>Visible = true;
    this.<%= entidadColeccion.uncapitalize %>Seleccionad<% if(entidadColeccion.isFemenino){ %>a<% } else{ %>o<% } %> = null;
  }

  agregar<%= entidadColeccion.capitalize %>EnTabla(evento: I<%= entidadColeccion.capitalize %>) {
    this.<%= entidadColeccion.pluralizeUncapitalize %>.push(evento);
  }

  eliminar<%= entidadColeccion.capitalize %>EnTabla(evento: I<%= entidadColeccion.capitalize %>) {
    remove(this.<%= entidadColeccion.pluralizeUncapitalize %>, (<%= entidadColeccion.uncapitalize %>: I<%= entidadColeccion.capitalize %>) => {
      return <%= entidadColeccion.uncapitalize %>.id === evento.id;
    });
  }

  actualizar<%= entidadColeccion.capitalize %>EnTabla(evento: I<%= entidadColeccion.capitalize %>) {
    const indice<%= entidadColeccion.capitalize %> = this.<%= entidadColeccion.pluralizeUncapitalize %>.findIndex(<%= entidadColeccion.uncapitalize %> => {
      return <%= entidadColeccion.uncapitalize %>.id === evento.id;
    });

    if (indice<%= entidadColeccion.capitalize %> >= 0) {
      this.<%= entidadColeccion.pluralizeUncapitalize %>[indice<%= entidadColeccion.capitalize %>] = evento;
    } else {
      log.error('No se ha encontrado <%= entidadColeccion.uncapitalize %> para actualizar en tabla');
    }
  }
  <% }) %>
}

interface IEventoAutoCompletado {
  originalEvent: any;
  query: string;
}
