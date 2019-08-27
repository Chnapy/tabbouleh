# Tabbouleh - ![GitHub](https://img.shields.io/github/license/Chnapy/tabbouleh) [![NPM version](http://img.shields.io/npm/v/tabbouleh.svg?style=flat)](https://www.npmjs.org/package/tabbouleh) ![npm bundle size](https://img.shields.io/bundlephobia/min/tabbouleh) ![contribute](https://img.shields.io/badge/can%20I%20contribute-yes-brightgreen)


A TypeScript library which generate JSON Schema (draft 7) from data class definition, in runtime.

[![Travis](https://img.shields.io/travis/Chnapy/tabbouleh.svg)](https://travis-ci.org/Chnapy/tabbouleh)
[![Coverage Status](https://coveralls.io/repos/github/Chnapy/tabbouleh/badge.svg?branch=master)](https://coveralls.io/github/Chnapy/tabbouleh?branch=master)
[![Dev Dependencies](https://david-dm.org/Chnapy/tabbouleh/dev-status.svg)](https://david-dm.org/Chnapy/tabbouleh?type=dev)


  - **Class-based** - Structure your data definitions with classes, in which you put your JSON Schema properties. No need to create other types, classes or variables. 

  - **Decorators** - Define JSON Schema of data fields with decorators, for readability & understandability.

  - **Field type inference** - Type of the field JSON Schema can be inferred from its TypeScript type.

  - **Non-opinionated** - Tabbouleh is not linked to any other libraries. Choose the validator you want, the form generator you want, they just have to work with JSON Schema format which is quite generic.

---

- [Install](#install)
- [Get started](#get-started)
  - [Define a data structure](#define-a-data-structure)
  - [Generate its JSON Schema](#generate-its-json-schema)
- [Motivation](#motivation)
- [Note on draft used](#note-on-draft-used)
- [Use cases](#use-cases)
  - [Data validation](#data-validation)
  - [Form generation](#form-generation)
- [API](#api)
  - [`@JSONSchema`](#jsonschema)
  - [`@JSONProperty`](#jsonproperty)
  - [`@JSONString`](#jsonstring)
  - [`@JSONNumber` & `@JSONInteger`](#jsonnumber--jsoninteger)
  - [`@JSONBoolean`](#jsonboolean)
  - [`@JSONObject`](#jsonobject)
  - [`@JSONArray`](#jsonarray)
- [How referencing works](#how-referencing-works)
  - [Wrap the class !](#wrap-the-class-)
- [Credits](#credits)

---

## Install

```bash
npm install tabbouleh --save
```

For enable TypeScript decorators, your `tsconfig.json` needs the following flags:
```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

## Get started

Let's imagine a login case.

### Define a data structure

The user will login with:

  - its **email** - It must follow the email format.
  - its **password** - It must have at least 6 chars.

All these fields are required.

```typescript
import { JSONSchema, JSONString } from 'tabbouleh';

@JSONSchema<LoginData>({
  required: ['email', 'password']
})
export class LoginData {

  @JSONString({
    format: 'email'
  })
  email: string;

  @JSONString({
    minLength: 6
  })
  password: string;

}
```

### Generate its JSON Schema

From our data structure, we generate its JSON Schema.

```typescript
import Tabbouleh from 'tabbouleh';
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = Tabbouleh.generateJSONSchema(LoginData);
```

And our schema looks like...

```JSON
{
  "type": "object",
  "required": [
    "email",
    "password"
  ],
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 6
    }
  }
}
```

## Motivation

To understand my motivation behind Tabbouleh we have to simulate an user data input process.
Like a **login**.

Let's list the steps:

  - Define the data structure (like with a type or class). We have an username and a password.

  - [front-end] Generate a form with an input for each of the data fields, which one need to have some rules (required, minLength, ...).

  - [front-end] On form submit, validate the data, check that it follows all the rules.
  
  - [front-end] Then send the data to the back-end.
  
  - [back-end] On data receipt, validate the data, again (no trust with front).

If you ever developed this kind of process you may know the inconsistency of the binding between the data and each of these steps.

When we create the form, there is no concrete link between inputs and the data structure. 
We have to create an input for each data field, give it its rules in a HTML way.

Then on form submit, the data must be generated from inputs values (from FormData object), and validated with the data rules, for each field.

Again, when the back-end has the data, it validate it with the same rules.

The definition of these rules and there validation may be programmatically do, in each of these steps with lot of redundancy, fat & ugly code, poor maintainability, and too much time.

I wanted a way to define all these rules easily, elegantly, without a ton of code. When I define my data structure, I define its validation rules in the same place. And from my data structure, I get my related JSON Schema.
It's simple, it's how Tabbouleh works.

Then I use the generated JSON Schema for generate my form, and validate the data submitted. Easily.

The JSON Schema format is normalized and handled by many data validators and form generators.

But careful, Tabbouleh will not validate your data, or generate your form. It'll just do the first step of these: generate the JSON Schema, which be used for these purposes.
Check the #use cases for more.

## Note on draft used

Tabbouleh actually uses the **draft 7** of JSON Schema specification.

For more:

  - http://json-schema.org/specification.html
  - https://tools.ietf.org/html/draft-handrews-json-schema-validation-01

## Use cases

### Data validation

TODO

### Form generation

TODO

## API

Schema definitions are made in your data class, with decorators.

### `@JSONSchema`

The only decorator for the class head. It defines the root schema properties.

[More infos on which fields you can use.](https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10) [10]

```typescript
@JSONSchema<LoginData>({
  $id: "https://example.com/login.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Login data",
  description: "Data required form user login",
  required: ['email', 'password']
})
export class LoginData {

  @JSONString
  email: string;

  @JSONString
  password: string;

}
```

```typescript
@JSONSchema
export class LoginData {

  @JSONString
  email: string;

  @JSONString
  password: string;

}
```

### `@JSONProperty`

Field decorator which doesn't define the schema `type`. 
If not defined it will be inferred from the field type.

Depending on the `type` given, see the corresponding decorator to know which fields are allowed. 
Also, [more infos on which fields you can use.](https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1) [6.1]

```typescript
@JSONSchema
export class LoginData {

  @JSONProperty
  email: string;

  @JSONProperty<JSONEntityString>({
    type: 'string',
    minLength: 6
  })
  password: string;

}
```

### `@JSONString`

Field decorator for **string** type.

[More infos on which fields you can use.](https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3) [6.3]

```typescript
@JSONSchema
export class LoginData {

  @JSONString({
    format: 'email',
    maxLength: 64
  })
  email: string;

  @JSONString
  password: string;

}
```

### `@JSONNumber` & `@JSONInteger`

Field decorators for **number** and **integer** types. They share the same fields.

[More infos on which fields you can use.](https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2) [6.2]

```typescript
@JSONSchema
export class UserData {

  @JSONInteger({
    minimum: 0
  })
  age: number;

  @JSONNumber
  percentCompleted: number;

}
```

### `@JSONBoolean`

Field decorator for **boolean** type.

```typescript
@JSONSchema
export class UserData {

  @JSONBoolean
  active: boolean;

}
```

### `@JSONObject`

Field decorator for **object** type.

[More infos on which fields you can use.](https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5) [6.5]

```typescript
@JSONSchema
export class UserData {

  @JSONObject({
    properties: {
      street: {
        type: 'string'
      },
      city: {
        type: 'string'
      }
    }
  })
  address: object;

}
```

#### Class reference

With this decorator you can reference an other schema class.

[Wrap your class !](#wrap-the-class-)

```typescript
@JSONSchema
export class UserData {

  @JSONObject(() => UserAddress)
  address: UserAddress;

}
```

```typescript
@JSONSchema
class UserAddress {

  @JSONString
  street: string;

  @JSONString
  city: string;

}
```

### `@JSONArray`

Field decorator for **array** type.

[More infos on which fields you can use.](https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4) [6.4]

```typescript
@JSONSchema
class UserData {

  @JSONArray({
    items: {
      type: 'integer'
    }
  })
  childrenAges: number[];

}
```

#### Class reference

As with `@JSONObject` you can reference an other schema class.

```typescript
@JSONSchema
class UserData {

  @JSONArray(() => UserData)
  children: UserData[];

}
```

You may want to add some properties in addition of the reference, for that put the reference in the `items` property.

```typescript
@JSONSchema
class UserData {

  @JSONArray({
    items: () => UserData,
    maxItems: 4,
    minItems: 0
  })
  children: UserData[];

}
```

## How referencing works

Let's take one of the previous example.

```typescript
@JSONSchema
export class UserData {

  @JSONObject(() => UserAddress)
  address: UserAddress;

}
```

```typescript
@JSONSchema
class UserAddress {

  @JSONString
  street: string;

  @JSONString
  city: string;

}
```

The JSON result will be:

```JSON
{
  "type": "object",
  
  "definitions": {
    "_UserAddress_": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        }
      }
    }
  },
  
  "properties": {
    
    "address": {
      "$ref": "#/definitions/_UserAddress_"
    }
    
  }
}
```

You can see that:
  - `UserAdress` schema was put in the `definitions` of the root schema,
  - `address` field is now referencing `UserAddress` by using the `$ref` field.
  
A class reference is **always** translated as a schema reference with the use of the `$ref`. 
Because of multiple same references optimization, and because of circular reference handling.



### Wrap the class !

You have to wrap the target in a function, like `() => MyClass`. 

It is required because of the case of circular referencing which may cause an `undefined` value instead of the referenced class.


## Credits

This library was created with [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).

<!--## Credits-->

<!--Made with :heart: by [@alexjoverm](https://twitter.com/alexjoverm) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):-->

<!--<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!--<!-- prettier-ignore -->
<!--<!-- ALL-CONTRIBUTORS-LIST:END -->

<!--This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!-->

### So, why tabbouleh ?

[Hummus](https://www.npmjs.com/package/hummus) was already taken :shipit:
