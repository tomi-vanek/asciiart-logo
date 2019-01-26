// from node_modules: const logo = require('asciiart-logo');
const logo = require('./logo');
const config = require('./package.json');
config.font = 'Cricket';
console.log(logo(config).render());
