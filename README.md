# asciiart-logo

Library _asciiart-logo_ creates a rectangular panel with ASCII-art from application name, and optional additional information (author, application version, etc).

_asciiart-logo_ uses [FIGlet](http://www.figlet.org/examples.html) fonts for ASCII art title text.

## Quick Start

Download and installation of the library

``` Bash
npm install --save asciiart-logo
```

Usage in source code

``` JavaScript
const logo = require('asciiart-logo');
console.log(
  logo({
    title: 'Foo Bar',
    font: 'speed',
    padding: 5,
    margin: 2
  })
  .emptyLine()
  .right('version 3.7.123')
  .emptyLine()
  .wrap('This is a longer text that describes the values of the component for command line applications.')
  .render()
);
```

## Dependency

Component uses the library [figlet](https://www.npmjs.com/package/figlet) for ASCII art text rendering.
