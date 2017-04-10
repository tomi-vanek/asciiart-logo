'use strict';

// const logo = require('asciiart-logo');
const logo = require('./logo');

let config = require('./package.json');
config.font = 'Colossal';
console.log(logo(config).render());