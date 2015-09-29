module.exports = function(source) {
    var blocks = [];
    var p;
    while ((p = source.indexOf('/**')) != -1) {
        var e = source.indexOf('*/', p);
        if (e === -1) {
            blocks.push({type: 'source', value: source});
            source = '';
            break;
        }
        var codeBefore = source.substring(0, p);
        codeBefore && blocks.push({type: 'source', value: codeBefore});
        var jsDocLines = source.substring(p + 3, e).trim().split('\n');
        var markdown = [];
        for (var i = 0, l = jsDocLines.length; i < l; i++) {
            var line = jsDocLines[i].trim().replace(/^\*/, '').trim();
            if (!line.match(/^@[a-zA-Z]/)) {
                if (line.charAt(0) === '*' && line.charAt(1) === ' ') {
                    line = ' -' + line.substr(1);
                }
                markdown.push(line);
            }
        }
        markdown = markdown.join('\n').trim();
        markdown = markdown.replace(/([^\n]+)([\n\r]+)=(=+)/g, '# $1');
        var tp = 0;
        while ((tp = markdown.indexOf('```')) !== -1) {
            var te = markdown.indexOf('```', tp + 3);
            if (te === -1) break;
            var code = markdown.substring(tp + 3, te);
            var match = code.match(/^([a-zA-Z0-9]+)/);
            var lang;
            if (match) {
                lang = match[0];
                code = code.substr(lang.length).trim();
            }
            code =
                '--------------------------------------------------------------------------------' +
                '\n    ' + code.replace(/\n/g, '\n    ') +
                '\n--------------------------------------------------------------------------------';
            markdown = markdown.substr(0, tp) + code + markdown.substr(te + 3);
        }
        blocks.push({type: 'markdown', value: markdown});
        source = source.substr(e + 2);
    }
    if (source) {
        blocks.push({type: 'source', value: source});
    }
    return blocks.map(function(block) {
        if (block.type === 'source') {
            return '    ' + block.value.replace(/\n/g, '\n    ');
        } else {
            return block.value;
        }
    }).join('\n');
};
