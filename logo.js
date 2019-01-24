'use strict';

const figlet = require('figlet');
const toTitleCase = require('to-title-case');

module.exports = options => {
  const { name, version, description, font, padding, margin, lineChars } = options;

  const textToLines = (text, desiredLen, fixed) => {
    const maxLen = lines => (fixed || !lines.length) ? desiredLen :
      lines.reduce((r, x) => Math.max(r, x.length), desiredLen);
    return text.split(/\s+/g).reduce((lines, word) => {
      if (lines.length && lines[lines.length - 1].length + word.length < maxLen(lines)) {
        lines[lines.length - 1] = `${lines[lines.length - 1]} ${word}`;
      } else {
        lines.push(word);
      }
      return lines;
    }, []);
  }

  const logoTextArray = textToLines(toTitleCase(name), lineChars || 15);

  const logoLines = logoTextArray.reduce((result, line) => {
    return result.concat(figlet.textSync(line, { font: font }).split('\n'));
  }, []);

  let panelTextWidth = Math.max(30, logoLines.reduce((len, line) => line.length > len ? line.length : len, 0));

  const horizMargin = (margin === undefined) ? 2 : margin;
  const vertMargin = horizMargin / 2 | 0;
  const horizSpace = (padding === undefined) ? 2 : padding;
  const vertSpace = horizSpace / 2 | 0;
  const horizMarginText = horizMargin ? ' '.repeat(horizMargin) : '';

  const frameTop = `${horizMarginText},${'-'.repeat(panelTextWidth + 2 * horizSpace)}.`;
  const frameBottom = `${horizMarginText}\`${'-'.repeat(panelTextWidth + 2 * horizSpace)}'`;
  const _render = (line, leftSpaces, rightSpaces) => {
    const leftText = leftSpaces ? ' '.repeat(leftSpaces)  : '';
    const rightText = rightSpaces ? ' '.repeat(rightSpaces)  : '';
    return `${horizMarginText}|${leftText}${line}${rightText}|`;
  };
  const emptyLine = _render(' '.repeat(panelTextWidth), horizSpace, horizSpace);
  const spaceLines = vertSpace ? Array(vertSpace).fill(emptyLine) : [];
  const marginLines = vertMargin ? Array(vertMargin).fill('') : [];

  const lineLeft = line => _render(line, horizSpace, panelTextWidth - line.length + horizSpace)
  const lineRight = line => _render(line, panelTextWidth - line.length + horizSpace, horizSpace);
  const lineCenter = line => {
    const space = (panelTextWidth - line.length);
    const left = space / 2 | 0;
    const right = space - left;
    return _render(line, left + horizSpace, right + horizSpace);
  };
  const wordWrap = (text, align) => textToLines(text, panelTextWidth, true).map(line =>
      (align === 'RIGHT') ? lineRight(line) :
      (align === 'CENTER') ? lineCenter(line) :
      lineLeft(line));

  let content = [].concat(logoLines.map(line => lineLeft(line)));

  const _addLines = (lines, context) => {
    content = [].concat(content, lines);
    return context;
  }

  if (version) {
    _addLines([
            emptyLine, lineRight(`version ${version}`), emptyLine
        ]);
  }
  if (description) {
    _addLines(wordWrap(description));
  }

  const api = {
    left: text => _addLines(wordWrap(text, 'LEFT'), api),
    right: text => _addLines(wordWrap(text, 'RIGHT'), api),
    center: text => _addLines(wordWrap(text, 'CENTER'), api),
    wrap: text => _addLines(wordWrap(text), api),
    emptyLine: () => _addLines([emptyLine], api),
    emptyLines: count => _addLines(Array(count || 1).fill(emptyLine), api),
    render: () => [].concat(marginLines, frameTop, spaceLines, content, spaceLines, frameBottom, marginLines).join('\n')
  };

  return api;
};
