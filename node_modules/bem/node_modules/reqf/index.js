var Module = require('module'),
    PATH = require('path');

module.exports = function(path, parent) {
    var mod = new Module(path, parent || module);

    // tune module instance to let require() work in that module
    mod.filename = path;
    mod.paths = Module._nodeModulePaths(PATH.dirname(path));

    var reqFunc = function(path) {
        return mod.require(path);
    };

    // let require.resolve() to work in make.js modules
    reqFunc.resolve = function(request) {
        return Module._resolveFilename(request, mod);
    };

    return reqFunc;
};
