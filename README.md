# kill-peer-deps

Removes peer dependencies from all package.json files in a directory.
Running this script on a node_modules directory allows
shrink-wrapping projects with unsatisfied peer dependencies.

## Installation
```
npm install -g kill-peer-deps
```

## Usage
```
Usage: kill-peer-deps <path to node_modules>
```