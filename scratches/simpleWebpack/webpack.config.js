const path = require('path');
module.exports = {
  entry: "./src/index.js",
  mode:"development",
  output: {
    path: path.resolve(__dirname,'./dist'),//绝对路径
    filename: "main.js"
  }
}