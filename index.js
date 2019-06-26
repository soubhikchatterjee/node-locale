const path = require("path");
const fs = require("fs");

class Locale {
  constructor({ locale, modules = [], directories = [] }) {
    this._locale = locale;
    this._modules = modules;
    this._directories = directories;
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
    this._loadResources(); // Invalidate cache
  }

  removeModule(moduleName) {
    const index = this._modules.indexOf(moduleName);
    this._modules.splice(index, 1);
    this._loadResources(); // Invalidate cache
  }

  get locale() {
    return this._locale;
  }

  set locale(newLocale) {
    this._locale = newLocale;
    this._loadResources(); // Invalidate cache
  }

  _message(key) {
    if (!key) {
      throw new Error(`Key not specified`);
    }

    const resource = this._resource ? this._resource : this._loadResources();

    return resource && typeof resource[key] !== "undefined"
      ? resource[key]
      : "";
  }

  _loadResources() {
    if (!this._directories || this._directories.length === 0) {
      // If directory is not passed, add the default locale path to the directories array
      this._directories.push(path.join(__dirname, "resources", "locale"));
    }

    // Get the fileList of all the directories specified
    let fileListObject = {};
    for (let directory of [...new Set(this._directories)]) {
      // Collect file paths recursively for the directory
      directory = path.join(directory, this._locale);
      const fileList = this.walkSync(directory);
      fileListObject = { ...fileListObject, ...fileList };
    }

    // Iterate through all the file paths and read the json and store it in a global variable
    let finalResourceObject = {};
    for (const fileName in fileListObject) {
      if (fileListObject.hasOwnProperty(fileName)) {
        try {
          const parsedObject = JSON.parse(
            fs.readFileSync(fileListObject[fileName])
          );
          finalResourceObject = { ...finalResourceObject, ...parsedObject };
        } catch (error) {
          throw new Error(`Invalid JSON file ${fileListObject[fileName]}`);
        }
      }
    }

    return (this._resource = finalResourceObject);
  }

  walkSync(dir, fileList = {}) {
    fs.readdirSync(dir).forEach(file => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        return this.walkSync(path.join(dir, file), fileList);
      } else if (this._modules.includes(path.basename(file, ".json"))) {
        // If the filename matches the one specified in the modules then include the file
        const fileBasename = path.basename(file, ".json");
        fileList[fileBasename] = path.join(dir, file);
      } else {
        // Else continue to next iteration
        return;
      }
    });

    return fileList;
  }
}

module.exports = Locale;
