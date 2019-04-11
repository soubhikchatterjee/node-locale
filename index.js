const path = require("path");
const fs = require("fs");

class Locale {
  constructor({ locale, modules = [], dir, silentFail = false }) {
    this._locale = locale;
    this._modules = modules;
    this._dir = dir;
    this._silentFail = silentFail;
  }

  _(key, args = []) {
    const message = this._message(key);
    const final = message.split(" ").map(item => {
      if (item.match(/{{.}}/)) {
        const getIndex = item.match(/\d/);

        if (!getIndex) {
          return "";
        }

        return item.replace(/{{.}}/g, args[getIndex]);
      }

      return item;
    });

    return final.join(" ");
  }

  get modules() {
    return this._modules;
  }

  addModule(newModule) {
    // If module already exists, bailout!
    if (this._modules.indexOf(newModule) !== -1) {
      return;
    }

    this._modules.push(newModule);
    this._loadResource(); // Invalidate cache
  }

  removeModule(moduleName) {
    const index = this._modules.indexOf(moduleName);
    this._modules.splice(index, 1);
    this._loadResource(); // Invalidate cache
  }

  get locale() {
    return this._locale;
  }

  set locale(newLocale) {
    this._locale = newLocale;
    this._loadResource(); // Invalidate cache
  }

  _message(key) {
    if (!key) {
      throw new Error(`Key not specified`);
    }

    const resource = this._resource ? this._resource : this._loadResource();
    return resource[key] ? resource[key] : "";
  }

  _loadResource() {
    if (!this._dir) {
      this._dir = path.join(__dirname, "resources", "locale");
    }

    let finalObject = {};
    for (const moduleItem of this._modules) {
      const dir = path.join(this._dir, this._locale);
      const langFile = path.join(dir, `${moduleItem}.json`);

      if (!fs.existsSync(langFile)) {
        if (this._silentFail === false) {
          console.log("siltr", this._silentFail);
          throw new Error(`Language file ${langFile} does not exists`);
        }
        continue;
      }

      // Read the contents of the file
      const readFile = fs.readFileSync(langFile);
      const parsedObject = JSON.parse(readFile);
      finalObject = {
        ...finalObject,
        ...parsedObject
      };
    }

    try {
      return (this._resource = finalObject);
    } catch (error) {
      throw new Error(`Invalid JSON file ${langFile}`);
    }
  }
}

module.exports = Locale;
