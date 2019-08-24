# Tabbouleh - ![GitHub](https://img.shields.io/github/license/Chnapy/tabbouleh) [![NPM version](http://img.shields.io/npm/v/tabbouleh.svg?style=flat)](https://www.npmjs.org/package/tabbouleh) ![npm bundle size](https://img.shields.io/bundlephobia/min/tabbouleh) ![contribute](https://img.shields.io/badge/can%20I%20contribute-yes-brightgreen)

[![Travis](https://img.shields.io/travis/Chnapy/tabbouleh.svg)](https://travis-ci.org/Chnapy/tabbouleh)
[![Coverage Status](https://coveralls.io/repos/github/Chnapy/tabbouleh/badge.svg?branch=master)](https://coveralls.io/github/Chnapy/tabbouleh?branch=master)
[![Dev Dependencies](https://david-dm.org/Chnapy/tabbouleh/dev-status.svg)](https://david-dm.org/Chnapy/tabbouleh?type=dev)


Tabbouleh is a TypeScript library which generate JSON Schema (draft 7) from data class definition, in runtime.

  - **Class-based** - Structure your data definitions with classes, in which you put your JSON Schema properties. No need to create other types, classes or variables. 

  - **Decorators** - Define JSON Schema of data fields with decorators, for readability & understandability.

  - **Field type inference** - Type of the field JSON Schema can be inferred from its Typescript type.

## Motivation

To understand why I made Tabbouleh we have to simulate a user data input process.
Like an **authentication**.

Let list the steps:

  - Define the data structure (like with a type or class). We have an username and a password.

  - [front-side] Generate a form with an input for each of the data fields, which one need to have some rules (required, minLength, ...).

  - [front-side] On form submit, validate the data, check that it follows all the rules.
  
  - [front-side] Then send the data to the back-end.
  
  - [back-side] On data receipt, validate the data, again (no trust with front).

If you ever developed this kind of process you may know the inconsistency of the binding between the data and each of these steps.

Let take the data validation part. 
It's made front-side on form generate (input rules), then on form submit (data validate). Depending on your app logic, you may do only one of these step.
Back-side, data is again validated, because we can't trust the front.

The definition of these rules and there validation may be programmatically do, in each of these steps with lot of redundancy, fat & ugly code, poor maintainability, and too much time.

I wanted a way to define all these rules easily, elegantly, without a ton of code. When I define my data structure, I define its validation rules. It's simple, it's how Tabbouleh works.
Then I use the generated JSON Schema for generate my form, and validate the data submitted. Easily.

The JSON Schema format is normalized and handled by data validators and form generators.

But careful, Tabbouleh will not validate your data, or generate your form. It'll just do the first step of these: generate the JSON Schema, which be used for these purposes.
Check the #use cases for more.

---


Some uses cases:
- [validate some JSON data](#usage-with-ajv)
  - send by the front
  - loaded from JSON file
- [building HTML forms from JSON Schemas](#usage-with-react-jsonschema-form)

### Installation

```bash
npm install tabbouleh --save
```

tabbouleh requires [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) (for decorators)

```bash
npm install reflect-metadata --save-dev
```

Your `tsconfig.json` needs the following flags:
```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

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
