const locale = require('nodejs-locale');

var translate = new locale({
    locale: 'en',
    module: 'clients'
});


console.log(

    translate.message('simple'),

    translate.format('advanced', ['user', 'nodejs-locale']),

);
