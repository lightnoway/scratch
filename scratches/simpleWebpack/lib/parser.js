
// import  traverse from "@babel/traverse"
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default; //不能用？
const { transformFromAst } = require('@babel/core');
module.exports = {
  getAst: path => {

    const content = fs.readFileSync(path, { encoding: 'utf8' });
    return parser.parse(content, {
      sourceType: "module"
    })
  },
  getDependecies: (ast, filename) => { 
    const dependecieds = {};
    traverse(ast, {//todo traverse
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        const newfile = path.join(dirname,node.source.value)
        dependecieds[node.source.value]=newfile;
      }
    })
    // console.log('dependecieds:',dependecieds);
    return dependecieds;
  },
  getCode: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code;
    // console.log( "code:",code,"===code");
  }
}