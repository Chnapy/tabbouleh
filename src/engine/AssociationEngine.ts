import { ClassLike } from '../types/ClassTypes';
import { JSONSchema7 } from 'json-schema';
import { REFLECT_KEY } from '../decorators/ReflectKeys';
import { Association, AssociationMap } from '../types/AssociationTypes';
import PropertyEngine from './PropertyEngine';
import SchemaEngine from './SchemaEngine';
import { NotAJsonSchemaError } from '../exception/NotAJsonSchemaError';

export default class AssociationEngine {
  static computeJSONAssociations(target: ClassLike): void {
    const assocMapClass = AssociationEngine.getAssociations(target.name, target.prototype);

    assocMapClass.forEach(a => {
      const valueSchema = SchemaEngine.getReflectSchema(a.target);

      if (!valueSchema) {
        throw new NotAJsonSchemaError(a.target);
      }

      valueSchema.properties = PropertyEngine.getReflectProperties(a.target.prototype);

      const value = a.jsonPropertyKey
        ? {
            [a.jsonPropertyKey]: valueSchema
          }
        : valueSchema;

      PropertyEngine.defineReflectProperties(target.prototype, a.key, value);
    });
  }

  static addAssociation<C extends ClassLike>(
    prototypeSource: C['prototype'],
    propertyKey: keyof C['prototype'] & string,
    jsonProperty: keyof JSONSchema7 | null,
    classTarget: ClassLike
  ): void {
    const className = prototypeSource.constructor.name;

    const association: Association = {
      className,
      key: propertyKey,
      jsonPropertyKey: jsonProperty,
      target: classTarget
    };

    const associationMap = AssociationEngine.getReflectAssociation(prototypeSource) || {};

    let assocMapClass = associationMap[className] || [];

    // if an association for this key already isset, remove it
    assocMapClass = assocMapClass.filter(
      a => a.key !== association.key && a.jsonPropertyKey !== association.jsonPropertyKey
    );

    associationMap[className] = assocMapClass;

    assocMapClass.push(association);

    AssociationEngine.setReflectAssociation(prototypeSource, associationMap);
  }

  static getAssociations<C extends ClassLike>(
    className: C['name'],
    prototypeSource: C['prototype']
  ): Association[] {
    const associationMap = AssociationEngine.getReflectAssociation(prototypeSource) || {};

    return associationMap[className] || [];
  }

  private static getReflectAssociation(
    prototypeTarget: ClassLike['prototype']
  ): AssociationMap | undefined {
    return Reflect.getMetadata(REFLECT_KEY.JSON_ASSOCIATIONS, prototypeTarget);
  }

  private static setReflectAssociation(
    prototypeTarget: ClassLike['prototype'],
    associationMap: AssociationMap
  ): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_ASSOCIATIONS, associationMap, prototypeTarget);
  }
}
