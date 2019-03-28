const T = require('nodejs-locale');
const path = require('path');

var t = new T({
    locale: 'en',
    module: 'clients',
    dir: path.join(__dirname, 'resources', 'locale')
});

console.log(t._('simple')); // Thanks for using this package

// Can also load nested JSON objects
console.log(t._('nested').a.b); // Yay!

// Supports arguments
console.log(t._('advanced', ['John', 'nodejs-locale'])); // Thanks John, for using nodejs-locale!!!!!!
