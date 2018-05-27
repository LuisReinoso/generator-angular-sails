'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var fs = require('fs');
var utils = require('../utils');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the superb ' +
          chalk.red('generator-angular-sails') +
          ' module generator!'
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'modeloDeDatos',
        message: 'Ruta relativa al archivo del modelo de datos',
        default: 'modeloDeDatos.json'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    console.log(this.props.modeloDeDatos);
    var modelos = JSON.parse(fs.readFileSync(this.props.modeloDeDatos, 'utf8'));
    var entidades = utils.getEntities(modelos, ['relativeURI']);
    for (const entidad of entidades) {
      console.log(entidad);
      this.fs.copyTpl(
        this.templatePath('src/entidad/_entidad-routing.module.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/${entidad.uncapitalize}-routing.module.ts`
        ),
        {
          entidad: entidad
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/_entidad.component.html'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/${entidad.uncapitalize}.component.html`
        ),
        {
          entidad: entidad
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/_entidad.component.scss'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/${entidad.uncapitalize}.component.scss`
        )
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/_entidad.component.spec.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/${entidad.uncapitalize}.component.spec.ts`
        ),
        {
          entidad: entidad
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/_entidad.component.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/${entidad.uncapitalize}.component.ts`
        ),
        {
          entidad: entidad
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/servicios/_entidad.service.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/servicios/${entidad.uncapitalize}.service.ts`
        ),
        {
          entidad: entidad
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/servicios/_entidad.service.spec.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/servicios/${entidad.uncapitalize}.service.spec.ts`
        ),
        {
          entidad: entidad
        }
      );

      var relaciones = utils.getRelations(entidad, entidades);
      var colecciones = utils.getColecciones(entidad, entidades);
      console.log(relaciones);
      console.log(colecciones);

      this.fs.copyTpl(
        this.templatePath('src/entidad/_entidad.module.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/${entidad.uncapitalize}.module.ts`
        ),
        {
          entidad: entidad,
          colecciones: colecciones
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/crud-entidad/_crud-entidad.component.html'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/crud-${entidad.uncapitalize}/crud-${
            entidad.uncapitalize
          }.component.html`
        ),
        {
          entidad: entidad,
          relaciones: relaciones,
          colecciones: colecciones
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/crud-entidad/_crud-entidad.component.scss'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/crud-${entidad.uncapitalize}/crud-${
            entidad.uncapitalize
          }.component.scss`
        ),
        {
          entidad: entidad,
          relaciones: relaciones,
          colecciones: colecciones
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/crud-entidad/_crud-entidad.component.spec.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/crud-${entidad.uncapitalize}/crud-${
            entidad.uncapitalize
          }.component.spec.ts`
        ),
        {
          entidad: entidad,
          relaciones: relaciones,
          colecciones: colecciones
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/crud-entidad/_crud-entidad.component.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/crud-${entidad.uncapitalize}/crud-${
            entidad.uncapitalize
          }.component.ts`
        ),
        {
          entidad: entidad,
          relaciones: relaciones,
          colecciones: colecciones
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/entidad/crud-entidad/servicios/_crud-entidad.service.ts'),
        this.destinationPath(
          `src/${entidad.uncapitalize}/crud-${entidad.uncapitalize}/servicios/crud-${
            entidad.uncapitalize
          }.service.ts`
        ),
        {
          entidad: entidad,
          relaciones: relaciones
        }
      );

      this.fs.copyTpl(
        this.templatePath(
          'src/entidad/crud-entidad/servicios/_crud-entidad.service.spec.ts'
        ),
        this.destinationPath(
          `src/${entidad.uncapitalize}/crud-${entidad.uncapitalize}/servicios/crud-${
            entidad.uncapitalize
          }.service.spec.ts`
        ),
        {
          entidad: entidad,
          relaciones: relaciones
        }
      );
    }
  }

  install() {
    // This.installDependencies();
  }
};
