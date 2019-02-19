# Tabbouleh

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/Chnapy/tabbouleh.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/Chnapy/tabbouleh.svg)](https://travis-ci.org/Chnapy/tabbouleh)
[![Coverage Status](https://coveralls.io/repos/github/Chnapy/tabbouleh/badge.svg?branch=master)](https://coveralls.io/github/Chnapy/tabbouleh?branch=master)
[![Dev Dependencies](https://david-dm.org/Chnapy/tabbouleh/dev-status.svg)](https://david-dm.org/Chnapy/tabbouleh?type=dev)

This project is designed to use Typescript classes for data validation (Java developers may say "Bean Validation") generating JSON Schema from them. 
With tabbouleh you could use your classes for both define the data and validate/constraint them using annotations and Typescript typing. 
ORM users, you may find it familiar.

### Installation

```bash
npm install tabbouleh --save-dev
```

tabbouleh requires reflect-metadata (for annotations)

```bash
npm install reflect-metadata --save-dev
```

Your tsconfig.json needs the following flags:
```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

## Model definition

```Typescript
import { JSONClass, JSONAttribute, JSONEntityInteger, JSONEntityString } from 'tabbouleh';

@JSONClass()
class User {
  
  @JSONAttribute<JSONEntityInteger>({
    type: 'integer',
    minimum: 0
  })
  size: number;

  @JSONAttribute<JSONEntityString>({
    minLength: 6
  })
  email: string;
  
}
```

The class has to be annotated with the `@JSONClass()` decorator. All the properties who have to be in the JSON Schema need to be annotated with the `@JSONAttribute()` decorator.

### `@JSONClass`

TODO

### `@JSONAttribute`

TODO

## Usage

```Typescript
import { Tabbouleh } from 'tabbouleh';

// we use the example upper
const classes = {
  User
};

const schemas = Tabbouleh.generateJSONSchemas(classes);

schemas.User  // we have now the User schema !
```

The keys of the object `schemas` returned are exactly the same as the keys of the object `classes` given.

In this example, given the class User we saw upper, the value of `schemas.User` is the one below:

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
      "minLength": 6
    }
  }
}
```

### Credits

This library was created with [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).

<!--## Credits-->

<!--Made with :heart: by [@alexjoverm](https://twitter.com/alexjoverm) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):-->

<!--<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!--<!-- prettier-ignore -->
<!--<!-- ALL-CONTRIBUTORS-LIST:END -->

<!--This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!-->
