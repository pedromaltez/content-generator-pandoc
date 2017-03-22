var chokidar = require('chokidar');
var pandoc = require('node-pandoc');
var anymatch = require('anymatch');
// var markdownInclude = require('markdown-include');

var PRODUCT_FILES = './products/**/*.md'
var OUTPUT_DIR = './compiled-products/'

console.log("Starting watcher...")

chokidar.watch(PRODUCT_FILES).on('change', (path) => {
  if (anymatch("**/_*.md", path)) {
    compileEverything()
  } else {
    compileMd(path)
  }
});

function compileMd(path) {
  console.log("compiling: ", path)
  var src = path;
  var args = '-f markdown -t html -o ' + path + '.html';
  var cb = function (err, result) {
    if (err) console.error('Oh Nos: ',err);
    // Without the -o arg, the converted value will be returned.
    return console.log(result), result;
  };
  // var src, args, callback;
  pandoc(src, args, cb)
}

function compileEverything() {

}


// // Call pandoc
// pandoc(src, args, callback);
