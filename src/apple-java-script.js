let AppleJavaScript = () => {
  // 1. build function
  // 2. exec
  // 3. eval result
};

AppleJavaScript.buildFunction = (fn) => {
  return `(${fn.toString()})()`;
};

export default AppleJavaScript;
