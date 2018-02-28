import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Route } from '../../core/route.service';
import { <%= entidad.capitalize %>Component } from './<%= entidad.uncapitalize %>.component';

const routes: Routes = Route.withShell([
  { path: '<%= entidad.uncapitalize %>', component: <%= entidad.capitalize %>Component, data: { title: extract('<%= entidad.capitalize %>') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class <%= entidad.capitalize %>RoutingModule { }
