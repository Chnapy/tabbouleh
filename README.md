# Tabbouleh - ![GitHub](https://img.shields.io/github/license/Chnapy/tabbouleh) [![NPM version](http://img.shields.io/npm/v/tabbouleh.svg?style=flat)](https://www.npmjs.org/package/tabbouleh) ![npm bundle size](https://img.shields.io/bundlephobia/min/tabbouleh) ![contribute](https://img.shields.io/badge/can%20I%20contribute-yes-brightgreen)


A TypeScript library which generate JSON Schema (draft 7) from data class definition, in runtime.

[![Travis](https://img.shields.io/travis/Chnapy/tabbouleh.svg)](https://travis-ci.org/Chnapy/tabbouleh)
[![Coverage Status](https://coveralls.io/repos/github/Chnapy/tabbouleh/badge.svg?branch=master)](https://coveralls.io/github/Chnapy/tabbouleh?branch=master)
[![Dev Dependencies](https://david-dm.org/Chnapy/tabbouleh/dev-status.svg)](https://david-dm.org/Chnapy/tabbouleh?type=dev)


  - **Class-based** - Structure your data definitions with classes, in which you put your JSON Schema properties. No need to create other types, classes or variables. 

  - **Decorators** - Define JSON Schema of data fields with decorators, for readability & understandability.

  - **Field type inference** - Type of the field JSON Schema can be inferred from its Typescript type.

  - **Non-opinionated** - Tabbouleh is not linked to any other libraries. Choose the validator you want, the form generator you want, they just have to work with JSON Schema format which is quite generic.

---

- [Install](#install)
- [Get started](#get-started)
  - [Define a data structure](#define-a-data-structure)
  - [Generate its JSON Schema](#generate-its-json-schema)
- [Motivation](#motivation)
- [Use cases](#use-cases)
  - [Data validation](#data-validation)
  - [Form generation](#form-generation)

---

## Install

```bash
npm install tabbouleh --save
```

For enable Typescript decorators, your `tsconfig.json` needs the following flags:
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

To understand my motivation behind Tabbouleh we have to simulate a user data input process.
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

## Use cases

### Data validation

### Form generation



## Schema definition

```Typescript
import { JSONSchema, JSONInteger, JSONRequired } from 'tabbouleh';

@JSONSchema
class User {
  
  @JSONInteger({
    minimum: 0
  })
  size: number;

  @JSONRequired
  email: string;
  
}
```

The class has to be decorated with the `@JSONSchema` decorator. 
All the properties who have to be in the JSON Schema need to be decorated with one of these decorators:
 - `JSONString`
 - `JSONNumber`
 - `JSONInteger`
 - `JSONBoolean`
 - `JSONProperty`
 
### `@JSONSchema`

TODO

### `@JSONProperty`

TODO

## Usage

```Typescript
import { Tabbouleh } from 'tabbouleh';

// we use the example upper: User

const userSchema = Tabbouleh.generateJSONSchema(
  User
);

// we now have the User schema !
```

In this example, given the class `User` we saw upper, the value of `userSchema` is the one below:

```JSON
{
  "type": "object",
  "properties": {
    "size": {
      "type": "integer",
      "minimum": 0
    },
    "email": {
      "type": "string",
      "required": true
    }
  }
}
```

### Usage with [ajv](https://github.com/epoberezkin/ajv)

TODO

### Usage with [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form)

TODO

### Why tabbouleh ?

[Hummus](https://www.npmjs.com/package/hummus) was already taken.

### Credits

This library was created with [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).

<!--## Credits-->

<!--Made with :heart: by [@alexjoverm](https://twitter.com/alexjoverm) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):-->

<!--<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!--<!-- prettier-ignore -->
<!--<!-- ALL-CONTRIBUTORS-LIST:END -->

<!--This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!-->
