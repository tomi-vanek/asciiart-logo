'use strict';


const figlet = require('figlet');
const config = require('../config/app-conf');

const _width = 70;
const _padding = 2;
const _line = '+' + '-'.repeat(_width + _padding) + '+';
const _render = message => `|${' '.repeat(_padding)}${message}${' '.repeat(_width - message.length)}|`;
const _graffiti = (message, font) =>
  figlet
    .textSync(message, {horizontalLayout: 'full', font: font}).split('\n')
    .map(fragment => _render(fragment)).join('\n');

const _appName = ` ${config.npm.name} ver. ${config.npm.version}`;
const _appDescription = ` ${config.npm.description}`;

module.exports = `
${_line}
${_graffiti('piano ai', 'Small')}
${_graffiti('Segentation', 'Small')}
${_render('')}
${_render(_appDescription)}
${_render(_appName)}
${_render('')}
${_line}
`;
