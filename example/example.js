const T = require("node-locale");
const path = require("path");

var t = new T({
  locale: "en", // The locale directory to look into
  module: ["clients", "common"], // The locale file(s) to load
  directories: [
    path.join(__dirname, "example", "resources", "locale"),
    path.join(__dirname, "example", "resources", "locale2")
  ] // The path where all the locale folders for eg. 'en' are placed.
});

console.log(t._("simple")); // Thanks for using this package
console.log(t._("greetings")); // Greetings from locale2

// Can also load nested JSON objects
console.log(t._("nested").a.b); // Yay!

// Supports arguments
console.log(t._("advanced", ["John", "node-locale"])); // Thanks John, for using node-locale!!!!!!

// Change the locale at run-time
t.locale = "fr";

// Add a new module name at run-time
t.addModule("users");

// Or Remove a new module at run-time
t.removeModule("users");

console.log(t._("greetings")); // Bonne journée!
