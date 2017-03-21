'use strict';

const config = require('./package.json');
// const logo = require('asciiart-logo');
const logo = require('./logo');

console.log(logo(config).render());
