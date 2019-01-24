// from node_modules: const logo = require('asciiart-logo');
const logo = require('./logo');
const config = require('./package.json');
config.font = 'Small';
console.log(logo(config).render());
