/*global describe it beforeEach Application */
import { expect } from 'chai';
import ajs from '../src/apple-java-script';

describe('AppleJavaScript', () => {
  describe('.build', () => {
    it('makes text string out of function', () => {
      let functionText = ajs.build(() => {
        return 5 + 5;
      });
      expect(functionText).to.equal(
        "(function () {\n        return 5 + 5;\n      })()"
      );
    });

    it('inserts arguments', () => {
      let functionText = ajs.build(5, ' times', (x, y) => {
        return x.toString() + y;
      });

      expect(functionText).to.equal(
        "(function (x, y) {\n        return x.toString() + y;\n      })(5, \" times\")"
      );
    });
  });

  describe('.execSync', () => {
    it('execs stringifyed function and returns it result', () => {
      let functionText = '(function(){return 5;})()'
      expect(ajs.execSync(functionText)).to.equal('5');
    });
  });
});
