# nodejs-locale
Loads a locale from a JSON file

## Usage
```
const resource = require('nodejs-locale');

var r = new resource({
    locale: 'en',
    module: 'users', 
    dir: './locales'
});

// Outputs a simple string
console.log(r.message('simple'));


// Outputs a formatted string
console.log(r.format('advanced', ['soubhik', 'angular']));


```

## Options

| Option Name | Description                                              | Data Type | Optional |
|-------------|----------------------------------------------------------|-----------|----------|
| locale      | The local folder name                                    | String    | No       |
| module      | The module to load                                       | String    | No       |
| dir         | Custom directory from where the locale should be loaded. defaults to `./resources/locale` | String    | Yes      |

