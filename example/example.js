const T = require("nodejs-locale");
const path = require("path");

var t = new T({
  locale: "en", // The locale directory to look into
  module: ["clients", "common"], // The locale file(s) to load
  dir: path.join(__dirname, "resources", "locale"), // The path where all the locale folders for eg. 'en' are placed.
  silentFail: true // Do not throw an exception if a module is not found
});

console.log(t._("simple")); // Thanks for using this package
console.log(t._("greetings")); // Have a good day!

// Can also load nested JSON objects
console.log(t._("nested").a.b); // Yay!

// Supports arguments
console.log(t._("advanced", ["John", "nodejs-locale"])); // Thanks John, for using nodejs-locale!!!!!!

// Change the locale at run-time
t.locale = "fr";

// Add a new module name at run-time
t.addModule("users");

// Or Remove a new module at run-time
t.removeModule("users");

console.log(t._("greetings")); // Bonne journée!
