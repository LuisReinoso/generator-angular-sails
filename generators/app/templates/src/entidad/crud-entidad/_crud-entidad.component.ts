import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Crud<%= entidad.capitalize %>Service } from './servicios/crud-<%= entidad.uncapitalize %>.service';
import { I<%= entidad.capitalize %> } from './../../../shared/modelos/<%= entidad.uncapitalize %>.model';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Logger } from '@app/core';
<% relaciones.forEach(function(entidadRelacion) { %>import { I<%= entidadRelacion.capitalize %> } from '@app/shared/modelos/<%= entidadRelacion.uncapitalize %>.model';
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

  @Output() <%= entidad.uncapitalize %>Crear: EventEmitter<I<%= entidad.capitalize %>>;
  @Output() <%= entidad.uncapitalize %>Eliminar: EventEmitter<I<%= entidad.capitalize %>>;
  @Output() <%= entidad.uncapitalize %>Actualizar: EventEmitter<I<%= entidad.capitalize %>>;

  <%= entidad.uncapitalize %>: Subject<I<%= entidad.capitalize %>>;
  formularioDetalle<%= entidad.capitalize %>: FormGroup;
  <% relaciones.forEach(function(entidadRelacion) { %><%= entidadRelacion.uncapitalize %>Seleccionad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>: I<%= entidadRelacion.capitalize %>;
  <% }) -%>

  <% relaciones.forEach(function(entidadRelacion) { %>resultado<%= entidadRelacion.pluralizeCapitalize %>Encontrad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>s: I<%= entidadRelacion.capitalize %>[];
  <% }) -%>

  constructor(
    private formBuilder: FormBuilder,
    private crud<%= entidad.capitalize %>Service: Crud<%= entidad.capitalize %>Service
  ) {
    this.<%= entidad.uncapitalize %> = new Subject<I<%= entidad.capitalize %>>();
    this.formularioDetalle<%= entidad.capitalize %> = this.suscribirEstadoInicialDeFormulario<%= entidad.capitalize %>();

    <% relaciones.forEach(function(entidadRelacion) { %>this.<%= entidadRelacion.uncapitalize %>Seleccionad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %> = null;
    <% }) -%>

    <% relaciones.forEach(function(entidadRelacion) { %>this.resultado<%= entidadRelacion.pluralizeCapitalize %>Encontrad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>s = [];
    <% }) -%>

    this.<%= entidad.uncapitalize %>Crear = new EventEmitter();
    this.<%= entidad.uncapitalize %>Eliminar = new EventEmitter();
    this.<%= entidad.uncapitalize %>Actualizar = new EventEmitter();
  }

  ngOnInit() {
    this.suscribir<%= entidad.capitalize %>ANuevosValores();
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
          if (<%= entidad.uncapitalize %>) {<% Object.keys(entidad.entity).forEach(function(campo) { %>
            this.formularioDetalle<%= entidad.capitalize %>.get('<%= campo %>')
              .setValue(<%= entidad.uncapitalize %>.<%= campo %>, { onlySelf: true});<% }) %>

            this.formularioDetalle<%= entidad.capitalize %>.enable(); // refresca la vista
          } else {
            // Volver al estado ingresar nuevo <%= entidad.uncapitalize %>
            // Observable es null
            this.formularioDetalle<%= entidad.capitalize %> = this.suscribirEstadoInicialDeFormulario<%= entidad.capitalize %>();
            this.formularioDetalle<%= entidad.capitalize %>.reset();
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
          this.<%= entidad.uncapitalize %>Crear.emit(data.respuesta.<%= entidad.uncapitalize %>);
          this.<%= entidad.uncapitalize %>.next(data.respuesta.<%= entidad.uncapitalize %>);
        },
        error => {
          const errorRespuesta = JSON.parse(error._body);
          log.error(errorRespuesta);
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
        },
        error => {
          const errorRespuesta = JSON.parse(error._body);
          log.error(errorRespuesta);
        }
      );
  }

  actualizar<%= entidad.capitalize %>(formulario<%= entidad.capitalize %>: I<%= entidad.capitalize %>) {
    this.crud<%= entidad.capitalize %>Service.actualizar<%= entidad.capitalize %>(formulario<%= entidad.capitalize %>)
      .pipe(map(res => res.json()))
      .subscribe(
        data => {
          this.<%= entidad.uncapitalize %>Actualizar.emit(formulario<%= entidad.capitalize %>);
        },
        error => {
          const errorRespuesta = JSON.parse(error._body);
          log.error(errorRespuesta);
        }
      );
  }

  <% relaciones.forEach(function(entidadRelacion) { %>
  busquedaDeSugerencias<%= entidadRelacion.capitalize %>(evento: IEventoAutoCompletado) {
    this.crud<%= entidad.capitalize %>Service.buscar<%= entidadRelacion.pluralizeCapitalize %>(evento.query)
    .pipe(map(res => res.json()))
    .subscribe(
      data => {
        if (data.registros) {
          this.resultado<%= entidadRelacion.pluralizeCapitalize %>Encontrad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>s = data.registros;
        } else {
          this.resultado<%= entidadRelacion.pluralizeCapitalize %>Encontrad<% if(entidadRelacion.isFemenino){ %>a<% } else{ %>o<% } %>s = [];
        }
      },
      error => {
        const errorRespuesta = JSON.parse(error._body);
        log.error(errorRespuesta);
      }
    );
  <% }) %>
  }
}

interface IEventoAutoCompletado {
  originalEvent: any;
  query: string;
}
