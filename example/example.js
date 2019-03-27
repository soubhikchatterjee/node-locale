const resource = require('nodejs-locale');

var translate = new resource({
    locale: 'en',
    module: 'clients'
});

console.log(translate.message('simple')); // Thanks for using this package

console.log(translate.format('advanced', ['user', 'nodejs-locale'])); // Thanks user for using nodejs-locale
