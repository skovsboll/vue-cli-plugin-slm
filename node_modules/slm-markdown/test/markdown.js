var Lab = require('lab');
var lab = exports.lab = Lab.script();

var suite   = lab.suite;
var before  = lab.before;
var after   = lab.after;
var test    = lab.test
var assert  = Lab.assert

suite('Markdown', function() {

  test('basic', function(done) {
    var slm = require('slm');
    var markdown = require('../index.js');
    markdown.register(slm.template);

    var fn = slm.compile([
      'h1 Hello Markdown!',
      'markdown:',
      '  Hi, **Slm**!',
      '  hello ~~hi~~ world'
      ].join('\n'));

    assert.deepEqual(fn({}), '<h1>Hello Markdown!</h1><p>Hi, <strong>Slm</strong>!\nhello <del>hi</del> world</p>\n');

    done();
  });

  test('custom engine name', function(done) {
    var slm = require('slm');
    var markdown = require('../index.js');
    markdown.register(slm.template, 'marked');

    var fn = slm.compile([
      'h1 Hello Markdown!',
      'marked:',
      '  Hi, **Slm**!',
      ].join('\n'));

    assert.deepEqual(fn({}), '<h1>Hello Markdown!</h1><p>Hi, <strong>Slm</strong>!</p>\n');

    done();
  });

  test('custom marked options', function(done) {
    var Template = require('slm/lib/template');
    var slm = new Template();
    var markdown = require('../index.js');
    markdown.register(slm, 'markdown', {gfm: false});

    var fn = slm.compile([
      'h1 Hello Markdown!',
      'markdown:',
      '  Hi, **Slm**!',
      '  hello ~~hi~~ world'
      ].join('\n'));

    assert.deepEqual(fn({}), '<h1>Hello Markdown!</h1><p>Hi, <strong>Slm</strong>!\nhello ~~hi~~ world</p>\n');

    done();
  });

  test('test interpolation', function(done) {
    var slm = require('slm');
    var markdown = require('../index.js');
    markdown.register(slm.template, 'markdown');

    var fn = slm.compile([
      'h1 Hello Markdown!',
      'markdown:',
      '  Hi, **Slm**!',
      '  **${this.name}** rules!!!'
      ].join('\n'));

    assert.deepEqual(fn({name: '"Slm"'}), '<h1>Hello Markdown!</h1><p>Hi, <strong>Slm</strong>!\n<strong>&quot;Slm&quot;</strong> rules!!!</p>\n');

    done();
  });


});
