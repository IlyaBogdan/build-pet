const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
  /*plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      allowEmptyValues: true,
      systemvars: true,
      silent: true,
    }),
  ],*/
}
