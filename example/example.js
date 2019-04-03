const T = require('nodejs-locale');
const path = require('path');

var t = new T({
    locale: 'en',
    module: 'clients',
    dir: path.join(__dirname, 'resources', 'locale')
});

console.log(t._('simple')); // Thanks for using this package
console.log(t._('greetings')); // Have a good day!

// Can also load nested JSON objects
console.log(t._('nested').a.b); // Yay!

// Supports arguments
console.log(t._('advanced', ['John', 'nodejs-locale'])); // Thanks John, for using nodejs-locale!!!!!!

// Change the locale at run-time
t.locale = 'fr'

// Change the module name at run-time
t.module = 'users';

console.log(t._('greetings')); // Bonne journée!
