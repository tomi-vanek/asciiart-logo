'use strict';

const figlet = require('figlet');
const to = require('to-case')

module.exports = options => {
    const { name, version, description, font, padding, margin } = options;

    const title = to.capital(name);
    const logo = title.length < 10 ? [].push(title) : title.split(' ');
    const logoLines = logo.reduce((result, line) => {
        return result.concat(figlet.textSync(line, { font: font }).split('\n'));
    }, []);
    let width = Math.max(30, logoLines.reduce((len, line) => line.length > len ? line.length : len, 0));

    const horizMargin = (margin === undefined) ? 2 : margin;
    const vertMargin = horizMargin / 2 | 0;
    const horizSpace = (padding === undefined) ? 2 : padding;
    const vertSpace = horizSpace / 2 | 0;
    const horizMarginText = horizMargin ? ' '.repeat(horizMargin) : '';

    const frameTop = `${horizMarginText},${'-'.repeat(width + 2 * horizSpace)}.${horizMarginText}`;
    const frameBottom = `${horizMarginText}\`${'-'.repeat(width + 2 * horizSpace)}'${horizMarginText}`;
    const _render = (line, leftSpaces, rightSpaces) => {
        const leftText = leftSpaces ? ' '.repeat(leftSpaces)  : '';
        const rightText = rightSpaces ? ' '.repeat(rightSpaces)  : '';
        return `${horizMarginText}|${leftText}${line}${rightText}|${horizMarginText}`;
    };
    const emptyLine = _render(' '.repeat(width), horizSpace, horizSpace);
    const spaceLines = vertSpace ? Array(vertSpace).fill(emptyLine) : [];
    const marginLines = vertMargin ? Array(vertMargin).fill(' '.repeat(width + 2 * (horizMargin + horizSpace + 1))) : [];

    const lineLeft = line => _render(line, horizSpace, width - line.length + horizSpace)
    const lineRight = line => _render(line, width - line.length + horizSpace, horizSpace);
    const lineCenter = line => {
        const space = (width - line.length);
        const left = space / 2 | 0;
        const right = space - left;
        return _render(line, left + horizSpace, right + horizSpace);
    };
    const wordWrap = text => text.split(/\s+/).reduce(
        (lines, word) => {
            (lines.length &&  lines[lines.length - 1].length + word.length < width) ?
            lines[lines.length - 1] = `${lines[lines.length - 1]} ${word}`:
                lines.push(word);
            return lines;
        }, []).map(line =>  lineLeft(line));

    let content = [].concat(logoLines.map(line => lineLeft(line)));

    const _addLines = (lines, context) => {
        content = [].concat(content, lines);
        return context;
    }

    if (version) {
        _addLines(lineRight(`version ${version}`));
    }
    if (description) {
        _addLines(wordWrap(description));
    }

    const engine = {
        left: text => _addLines(text.length < width ? [lineLeft(text)] : wordWrap(text), engine),
        right: text => _addLines(text.length < width ? [lineRight(text)] : wordWrap(text), engine),
        center: text => _addLines(text.length < width ? [lineCenter(text)] : wordWrap(text), engine),
        wrap: text => _addLines(wordWrap(text), engine),
        emptyLine: () => _addLines([emptyLine], engine),
        emptyLines: count => _addLines(Array(count || 1).fill(emptyLine), engine),
        render: () => [].concat(marginLines, frameTop, spaceLines, content, spaceLines, frameBottom, marginLines).join('\n')
    };

    return engine;
};