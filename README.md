# Tabbouleh

[![NPM version](http://img.shields.io/npm/v/tabbouleh.svg?style=flat)](https://www.npmjs.org/package/tabbouleh)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/Chnapy/tabbouleh.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/Chnapy/tabbouleh.svg)](https://travis-ci.org/Chnapy/tabbouleh)
[![Coverage Status](https://coveralls.io/repos/github/Chnapy/tabbouleh/badge.svg?branch=master)](https://coveralls.io/github/Chnapy/tabbouleh?branch=master)
[![Dev Dependencies](https://david-dm.org/Chnapy/tabbouleh/dev-status.svg)](https://david-dm.org/Chnapy/tabbouleh?type=dev)

This project is designed to use Typescript classes for data validation (Java developers may say "Bean Validation") generating JSON Schema from them. 
With tabbouleh you could use your classes for both define the data and validate/constraint them using annotations and Typescript typing. 
ORM users, you may find it familiar.

Some uses cases:
- [validate some JSON data](#usage-with-ajv)
  - send by the front
  - loaded from JSON file
- [building HTML forms from JSON Schemas](#usage-with-react-jsonschema-form)

### Installation

```bash
npm install tabbouleh --save
```

tabbouleh requires [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) (for annotations)

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

The class has to be annotated with the `@JSONSchema` decorator. 
All the properties who have to be in the JSON Schema need to be annotated with one of these decorators:
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
