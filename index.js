const path = require('path');
const fs = require('fs');

class Locale {

    constructor({ locale, module, dir }) {
        this._locale = locale;
        this._module = module;
        this._dir = dir;
    }

    _(key, args = []) {
        const message = this._message(key);
        const final = message.split(' ').map(item => {
            if (item.match(/{{.}}/)) {
                const getIndex = item.match(/\d/);

                if (!getIndex) {
                    return '';
                }

                return item.replace(/{{.}}/g, args[getIndex]);
            }

            return item;
        });

        return final.join(' ');
    }

    get module() {
        return this._module;
    }

    set module(newModule) {
        this._module = newModule;
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
        return resource[key] ? resource[key] : '';
    }

    _loadResource() {
        if (!this._dir) {
            this._dir = path.join(__dirname, 'resources', 'locale');
        }

        const dir = path.join(this._dir, this._locale);
        const langFile = path.join(dir, `${this._module}.json`);

        if (!fs.existsSync(langFile)) {
            throw new Error(`Language file ${langFile} does not exists`);
        }

        // Read the contents of the file
        const readFile = fs.readFileSync(langFile);

        try {
            return this._resource = JSON.parse(readFile);
        } catch (error) {
            throw new Error(`Invalid JSON file ${langFile}`);
        }
    }

}

module.exports = Locale;
