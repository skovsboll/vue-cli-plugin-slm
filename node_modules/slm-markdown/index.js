
exports.register = function(template, engineName, markedOptions) {
  var marked = require('marked');
  if (!engineName) {
    engineName = "markdown";
  }
  if (markedOptions) {
    marked.setOptions(markedOptions);
  }

  template.registerEmbeddedFunction(engineName, marked);
  return marked;
};
