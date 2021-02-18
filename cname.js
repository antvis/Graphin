/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const siteUrl = 'graphin.antv.vision';

fs.writeFile(path.resolve(__dirname, 'dist', 'CNAME'), siteUrl, err => {
  if (err) {
    throw err;
  }
  console.log('The CNAME was succesfully created!');
});
