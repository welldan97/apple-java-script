/*global describe it beforeEach Application */
import { expect } from 'chai';
import AppleJavaScript from '../src/apple-java-script';

describe('AppleJavaScript', () => {
  let ajs = AppleJavaScript;

  describe('.build', () => {
    it('makes text string out of function', () => {
      let functionText = ajs.buildFunction(() => {
        return 5 + 5;
      });
      expect(functionText).to.equal(
        "(function () {\n        return 5 + 5;\n      })()"
      );
    });
  });
});
