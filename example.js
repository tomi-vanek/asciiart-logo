'use strict';

const config = require('./package.json');
// const logo = require('asciiart-logo');
const logo = require('./logo');

    // .title(config.name, 'Small')
    // .right(config.version)
    // .wordwrap(config.description);
console.log(
  logo({
      title: config.name,
      font: 'stop',
      padding: 3,
      margin: 4
    })
    .left(config.name)
    .right(`version ${config.version}`)
    .wrap(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet consequat ipsum vestibulum eleifend.
Curabitur convallis odio a tellus rhoncus egestas. Nam lorem lectus, elementum vitae efficitur tincidunt,
accumsan sed tortor. Quisque tempor molestie nunc, ut tempor orci placerat scelerisque.
Integer euismod lacus ut placerat tincidunt. Donec dictum aliquam est, sed molestie purus euismod et.
Vestibulum vitae ligula non purus consectetur pellentesque.`)
    .render()
  );
