import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { <%= entidad.capitalize %>RoutingModule } from './<%= entidad.uncapitalize %>-routing.module';
import { <%= entidad.capitalize %>Component } from './<%= entidad.uncapitalize %>.component';
import { Crud<%= entidad.capitalize %>Component } from './crud-<%= entidad.uncapitalize %>/crud-<%= entidad.uncapitalize %>.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    <%= entidad.capitalize %>RoutingModule,
    AutoCompleteModule,
    TableModule
  ],
  declarations: [
    <%= entidad.capitalize %>Component,
    Crud<%= entidad.capitalize %>Component
  ]
})
export class <%= entidad.capitalize %>Module { }
