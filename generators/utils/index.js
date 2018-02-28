var _ = require('lodash');
var plural = require('pluralize-es');
var gender = require('gender-es');
var accents = require('remove-accents');

// Pone la primera letra en mayusculas
let capitalize = entityName => {
  return accents.remove(entityName.charAt(0).toUpperCase() + entityName.slice(1));
};

// Pone la primera letra en minusculas
let uncapitalize = entityName => {
  return accents.remove(entityName.charAt(0).toLowerCase() + entityName.slice(1));
};

let pluralize = entityName => {
  // Pluraliza el nombre
  return accents.remove(plural(entityName));
};

// Singular = (entityName) => {
//   // Singular del nombre
//   return p.singular(entityName);
// }

let isFemenino = entityName => {
  // Genero es femenino
  return gender.isFeminine(entityName);
};

let key = entity => {
  return Object.keys(entity).filter(field => entity[field].key);
};

let getRelations = (entity, entities) => {
  let referencias = [];

  // Obtengo los nombres de las referencias
  Object.keys(entity.entity).forEach(field => {
    if (entity.entity[field].model) {
      referencias.push(entity.entity[field].model);
    }
  });

  let referenciaCompleta = [];

  for (let indice = 0; indice < referencias.length; indice++) {
    const nombreReferencia = referencias[indice];

    let auxReferenciaCompleta = entities.filter(entidad => {
      return entidad.name === nombreReferencia;
    });

    if (auxReferenciaCompleta.length === 1) {
      referenciaCompleta = referenciaCompleta.concat(auxReferenciaCompleta);
    }
  }

  return referenciaCompleta;
};

let getEntities = (models, except) => {
  // Get the entities (All the keys of the model json) except
  // no entities like relativeURI
  var entities = Object.keys(_.omit(models, except));

  return entities.reduce((transf, entityName) => {
    var p = pluralize(entityName);
    // Var s = singular(entityName);
    var k = key(models[entityName]);

    transf.push({
      entity: models[entityName],
      key: k,

      name: entityName,
      capitalize: capitalize(entityName),
      uncapitalize: uncapitalize(entityName),

      // 'singular': s,
      // 'singularUncapitalize': uncapitalize(s),
      // 'singularCapitalize': capitalize(s),

      pluralize: p,
      pluralizeUncapitalize: uncapitalize(p),
      pluralizeCapitalize: capitalize(p),

      isFemenino: isFemenino(entityName)
    });

    return transf;
  }, []);
};

module.exports = {
  getEntities: getEntities,
  getRelations: getRelations
};
