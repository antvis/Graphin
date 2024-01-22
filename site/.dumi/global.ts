require('./style.css');

if (window) {
  (window as any).react = require('react');
  (window as any).reactDom = require('react-dom');
  (window as any).antd = require('antd');
  // (window as any).fecha = require('fecha');
  (window as any).lodashEs = require('lodash-es');
  // (window as any).G6 = require('@antv/g6');
  (window as any).graphin = require('@antv/graphin');
}
