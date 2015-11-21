var AppleJavaScript,
    exec,
    jas,
    serialize,
    slice = [].slice;

exec = require('child_process').exec;

serialize = require('serialize-javascript');

AppleJavaScript = (function () {
    function AppleJavaScript(fn1) {
        this.fn = fn1;
    }

    AppleJavaScript.prototype.run = function () {
        var arg, args, cb, command, j, script;
        args = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), cb = arguments[j++];
        if (typeof cb !== 'function') {
            args.push(cb);
        }
        script = this.build(this.fn, args);
        arg = this._escapeShell(script);
        command = "osascript -s s -l JavaScript -e '" + arg + "'";
        console.log(command);
        return exec(command, function (error, stdout, stderr) {
            if (typeof cb === 'function') {
                return cb(error, stdout, stderr);
            }
        });
    };

    AppleJavaScript.prototype.build = function (fn, args) {
        var varNames, vars;
        varNames = this._getArgumentNames(this.fn);
        vars = args.map(function (v, i) {
            return "var " + varNames[i] + " = " + serialize(v) + ";\n";
        }).join('');
        return vars + this._getBody(this.fn);
    };

    AppleJavaScript.prototype._getArgumentNames = function (fn) {
        var funStr;
        funStr = fn.toString();
        return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
    };

    AppleJavaScript.prototype._getBody = function (fn) {
        var fnText;
        fnText = fn.toString();
        return fnText.substring(fnText.indexOf('{') + 1, fnText.lastIndexOf('}'));
    };

    AppleJavaScript.prototype._escapeShell = function (str) {
        return str.replace(/'/g, "'\"'\"'");
    };

    return AppleJavaScript;
})();

jas = new AppleJavaScript(function (hello) {
    var iTunes;
    5 + hello;
    iTunes = Application('iTunes');
    iTunes.playlists.name();
    void 0;
});

jas.run(3, function (e, stdout, stderr) {
    console.log(stderr);
    return console.log(eval(stdout));
});