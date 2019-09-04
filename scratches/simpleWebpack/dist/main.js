(function(graph){
        function require(module){
          function localRequire(relativePath){
            return require(graph[module].dependecies[relativePath])
          }
          var exports = {};
          (function(require,exports,code){
            console.log('code before eval',code);
            eval(code)
          })(localRequire,exports,graph[module].code) 
          return exports;
        }
        require('./src/index.js')
    })({"./src/index.js":{"dependecies":{"./hello.js":"src/hello.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\n// const say = require(\"./hello.js\").say;\ndocument.write((0, _hello.say)('buddy'));"},"src/hello.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nfunction say(name) {\n  return \"hello \" + name;\n}"}})