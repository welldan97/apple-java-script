let buildFunction = (fn) => {
  return `(${fn.toString()})()`;
};

export default buildFunction;
