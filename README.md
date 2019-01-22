# asciiart-logo

Library _asciiart-logo_ creates a splash screen with logo from ASCII characters in text console. Splash screen is a rectangular panel and logo is the application name  rendered by ASCII-art [fonts](gallery.txt) extended by optional additional information (author, application version, short desctiption, etc).

_asciiart-logo_ can be used by starting of command line tools, web servers or REST API microservices as a visual feedback to the user or administrator about successful start of the application.

## Quick Start

1. Download and installation of the library `npm install asciiart-logo`
2. Test the output with `node example.js`

## Usage

_asciiart-logo_ uses [FIGlet](http://www.figlet.org/examples.html) fonts for ASCII art title text. See [available fonts](gallery.txt) in the library.

``` JavaScript
const logo = require('asciiart-logo');
console.log(
  logo({
    name: 'Foo Bar',
    font: 'Speed',
    lineChars: 15,
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

... and the output on the console:

``` console

  ,------------------------------------------------------------.  
  |                                                            |  
  |                                                            |  
  |     __________                 ________                    |  
  |     ___  ____/___________      ___  __ )_____ ________     |  
  |     __  /_   _  __ \  __ \     __  __  |  __ `/_  ___/     |  
  |     _  __/   / /_/ / /_/ /     _  /_/ // /_/ /_  /         |  
  |     /_/      \____/\____/      /_____/ \__,_/ /_/          |  
  |                                                            |  
  |                                                            |  
  |                                        version 3.7.123     |  
  |                                                            |  
  |     This is a longer text that describes the values of     |  
  |     the component for command line applications.           |  
  |                                                            |  
  |                                                            |  
  `------------------------------------------------------------'  

```

You may be interested also in complete [example code](./example.js) that shows typical usage of the asciiart-logo library.

## Dependency

Component uses the library [figlet](https://www.npmjs.com/package/figlet) for ASCII art text rendering.
