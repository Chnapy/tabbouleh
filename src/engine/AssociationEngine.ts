import { ClassLike } from '../types/ClassTypes';
import { JSONSchema7 } from 'json-schema';
import { REFLECT_KEY } from '../decorators/ReflectKeys';
import { Association, AssociationMap, ClassFn } from '../types/AssociationTypes';
import PropertyEngine from './PropertyEngine';
import SchemaEngine from './SchemaEngine';
import { NotAJsonSchemaError } from '../exception/NotAJsonSchemaError';
import { CircularDependencyError } from '../exception/CircularDependencyError';
import { Util } from './Util';

export default class AssociationEngine {
  static computeJSONAssociations(target: ClassLike, sourceStack: ClassLike[] = []): void {
    if (!Util.isClass(target)) {
      throw new NotAJsonSchemaError(target);
    }

    if (sourceStack.some(s => s.name === target.name)) {
      throw new CircularDependencyError(...sourceStack, target);
    }

    sourceStack.push(target);

    const assocMapClass = AssociationEngine.getAssociations(target.name, target.prototype);

    assocMapClass.forEach(a => {
      const assocTarget: ClassLike = a.targetFn();

      AssociationEngine.computeJSONAssociations(assocTarget, sourceStack);

      const valueSchema = SchemaEngine.getReflectSchema(assocTarget);

      if (!valueSchema) {
        throw new NotAJsonSchemaError(assocTarget);
      }

      valueSchema.properties = PropertyEngine.getReflectProperties(assocTarget.prototype);

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
    classTargetFn: ClassFn
  ): void {
    const className = prototypeSource.constructor.name;

    const association: Association = {
      className,
      key: propertyKey,
      jsonPropertyKey: jsonProperty,
      targetFn: classTargetFn
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
