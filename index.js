#!/usr/bin/env node
var fs = require("fs");
var path = require("path");

if (process.argv.length !== 3) {
    console.log("Usage: kill-peer-deps <path to node_modules>");
    return;
}
var directory = process.argv[2];
if (!path.isAbsolute(directory)) {
    var workingDir = process.cwd();
    directory = path.join(workingDir, directory);
}

recursiveFileSearch(directory, "package.json", function(packageJsonPath) {
    var json = require(packageJsonPath);
    if (json["peerDependencies"]) {
        delete json["peerDependencies"];
        fs.writeFile(packageJsonPath, JSON.stringify(json, null, 2));
    }
});

function recursiveFileSearch(directoryPath, filename, handler) {
    fs.readdir(directoryPath, (err, files) => {
        files.forEach(file => {
            var currentPath = path.join(directoryPath, file);
            var stat = fs.stat(currentPath, function (err, stat) {
                if (stat.isDirectory()) {
                    recursiveFileSearch(currentPath, filename, handler);
                }
                else if (file === filename) {
                    handler(currentPath);
                }
            });
        });
    })
}
