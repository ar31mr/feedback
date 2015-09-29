## reqf — custom require function creator

`reqf` (require factory) is a very simple helper that creates custom but fully functional `require()` functions.

### Usage

```js
var reqf = require('reqf'),
    myRequire = reqf(process.cwd());

console.log(myRequire.resolve('my-module'));
```

### Installation

    npm i --save reqf
