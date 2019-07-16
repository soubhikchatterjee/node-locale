# Localization for NodeJS

A simple yet powerful module that loads a locale from a JSON file. This is a perfect if you looking to make your nodejs project multilingual.

## Usage

```
const T = require('node-locale');

var t = new T({
    directories: ['./locales'], // An array containing path(s) to the "locale" folders.
    locale: 'en', // The locale directory to look into
    modules: ['users'], // The locale file(s) to load (omit the .json from the filename users.json)
});

// With the above settings, it will look for a locale file at: ./locales/en/users.json

// Outputs a simple string
console.log(t._('simple'));
console.log(t._('greetings'));


// Can also be used for nested JSON
console.log(t._('simple').a.b);

// Outputs a formatted string
console.log(t._('advanced', ['soubhik', 'angular']));

// Change the locale at run-time
t.locale = 'fr'

// Add a module name at run-time
t.addModule('users');

// or chain the method
t.addModule('users')
 .addModule('roles');

// Remove a module
t.removeModule('users');

// Get all modules
console.log(t.modules);

// Get locale string
console.log(t._('greetings'));
```

## Checkout the [Example](https://github.com/soubhikchatterjee/node-locale/tree/master/example)

## Options

| Option Name | Description                                                      | Data Type | Optional | Default Value      |
| ----------- | ---------------------------------------------------------------- | --------- | -------- | ------------------ |
| locale      | The local folder name                                            | String    | No       | -                  |
| modules     | The module(s) to load                                            | Array     | No       | -                  |
| directories | Custom directory path(s) from where the locale should be loaded. | Array     | Yes      | ./resources/locale |
