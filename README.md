# nodejs-locale
Loads a locale from a JSON file

## Usage
```
const T = require('nodejs-locale');

var t = new T({
    locale: 'en',
    module: 'users',
    dir: './locales'
});

// Outputs a simple string
console.log(t._('simple'));
console.log(t._('greetings'));


// Can also be used for nested JSON
console.log(t._('simple').a.b);

// Outputs a formatted string
console.log(t._('advanced', ['soubhik', 'angular']));

// Change the locale at run-time
t.locale = 'fr'

// Change the module name at run-time
t.module = 'users';

console.log(t._('greetings'));

```

## Checkout the [Example](https://github.com/soubhikchatterjee/nodejs-locale/tree/master/example)

## Options

| Option Name | Description                                              | Data Type | Optional |
|-------------|----------------------------------------------------------|-----------|----------|
| locale      | The local folder name                                    | String    | No       |
| module      | The module to load                                       | String    | No       |
| dir         | Custom directory from where the locale should be loaded. defaults to `./resources/locale` | String    | Yes      |
