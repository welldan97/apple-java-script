/*global describe it beforeEach Application */
import { expect } from 'chai';
import buildFunction from '../src/build-function';

describe('buildFunction', () => {
  it('should make text string out of function', () => {
    let functionText = buildFunction(() => {
      5 + 5;
    });
    expect(functionText).to.equal(
      "(function () {\n      5 + 5;\n    })()"
    );
  });
});
