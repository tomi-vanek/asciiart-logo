# asciiart-logo

Library _asciiart-logo_ creates a rectangular panel with ASCII-art from application name, and optional additional information (author, application version, etc).

_asciiart-logo_ uses [FIGlet](http://www.figlet.org/examples.html) fonts for ASCII art title text.

## Quick Start

Download and install the library

``` Bash
npm install --save asciiart-logo
```

Usage in source code

``` JavaScript
const config = require('./package.json');
const logo = require('asciiart-logo')
    .art(config.name)
    .right(config.version)
    .wrap(config.description);
console.log(logo.render());
```

## Dependency

[figlet](https://www.npmjs.com/package/figlet) library.

