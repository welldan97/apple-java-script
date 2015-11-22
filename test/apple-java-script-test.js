/*global describe it beforeEach Application */
import { expect } from 'chai';
import ajs from '../src/apple-java-script';

describe('AppleJavaScript', () => {
  describe('direct call', () => {
    it('should run', () => {
      ajs(() => {});
    });

    it('should return result', () => {
      let result = ajs(() => {
        let app = Application.currentApplication();
        app.includeStandardAdditions = true;
        return app.doShellScript('echo Babylon');
      });
      expect(result).to.equal('Babylon');
    });
  });

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

  describe('.unserialize', () => {
    it('unserializes regular js type', () => {
      expect(ajs.unserialize('{"a":"hello", "b":[1, 2]}'))
        .to.deep.equal({"a":"hello", "b":[1, 2]});
    });

    it('returns value itself for objects it cannot unserialize', () => {
      expect(ajs.unserialize('Application.currentApplication()'))
        .to.equal('Application.currentApplication()');
    });
  });
});
