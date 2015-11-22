import _ from 'lodash';
import serialize from 'serialize-javascript';

let AppleJavaScript = () => {
  // 1. build function
  // 2. exec
  // 3. eval result
};

AppleJavaScript.buildFunction = (...args) => {
  let fn = _(args).last()
  let argsToPass = args
        .slice(0, args.length - 1)
        .map( v => serialize(v)).join(', ');
  return `(${fn.toString()})(${argsToPass})`;
};

export default AppleJavaScript;
