import _ from 'lodash';
import serialize from 'serialize-javascript';
import { exec } from 'child_process';
import deasync from 'deasync';

let execSync = deasync(exec);

let escapeShell;

let AppleJavaScript = () => {
  // 1. build function
  // 2. exec
  // 3. eval result
};

AppleJavaScript.build = (...args) => {
  let fn = _(args).last()
  let argsToPass = args
        .slice(0, args.length - 1)
        .map( v => serialize(v)).join(', ');
  return `(${fn.toString()})(${argsToPass})`;
};

AppleJavaScript.execSync = (functionText) => {
  let functionTextEscaped = escapeShell(functionText);
  let command = "osascript -s s -l JavaScript -e '" + functionTextEscaped + "'";
  return _(execSync(command)).trim('\n');
};

AppleJavaScript.unserialize = (value) => {
  let result;
  try {
    eval(`result = ${value}`);
  } catch (e) {
    result = value;
  }
  return result;
}

escapeShell = (command) => {
  return command.replace(/'/g, "'\"'\"'");
};
export default AppleJavaScript;
