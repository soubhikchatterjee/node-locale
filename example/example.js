const resource = require('nodejs-locale');
const path = require('path');

var translate = new resource({
    locale: 'en',
    module: 'clients',
    dir: path.join(__dirname, 'resources', 'locale')
});

console.log(translate.message('simple')); // Thanks for using this package

// Can also load nested JSON objects
console.log(translate.message('nested').a.b); // Yay!

// Supports arguments
console.log(translate.format('advanced', ['user', 'nodejs-locale'])); // Thanks user for using nodejs-locale
