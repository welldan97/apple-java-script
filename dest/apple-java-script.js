'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _child_process = require('child_process');

var _deasync = require('deasync');

var _deasync2 = _interopRequireDefault(_deasync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global module*/

var execSync = (0, _deasync2.default)(_child_process.exec);

var escapeShell = undefined;

var AppleJavaScript = function AppleJavaScript() {
  var result = AppleJavaScript.runSafe.apply(AppleJavaScript, arguments);
  return AppleJavaScript.unserialize(result);
};

AppleJavaScript.runSafe = function () {
  var functionText = AppleJavaScript.build.apply(AppleJavaScript, arguments);
  return AppleJavaScript.execSync(functionText);
};

AppleJavaScript.build = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var fn = (0, _lodash2.default)(args).last();
  var argsToPass = args.slice(0, args.length - 1).map(function (v) {
    return (0, _serializeJavascript2.default)(v);
  }).join(', ');
  return '(' + fn.toString() + ')(' + argsToPass + ')';
};

AppleJavaScript.execSync = function (functionText) {
  var functionTextEscaped = escapeShell(functionText);
  var command = "osascript -s s -l JavaScript -e '" + functionTextEscaped + "'";
  return (0, _lodash2.default)(execSync(command)).trim('\n');
};

AppleJavaScript.unserialize = function (value) {
  var result = undefined;
  try {
    eval('result = ' + value);
  } catch (e) {
    result = value;
  }
  return result;
};

escapeShell = function (command) {
  return command.replace(/'/g, "'\"'\"'");
};

module.exports = AppleJavaScript;
exports.default = AppleJavaScript;