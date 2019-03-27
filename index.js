const path = require('path');
const fs = require('fs');

class Locale {

    constructor({ locale, module, dir }) {
        this.locale = locale;
        this.module = module;
        this.dir = dir;
    }

    message(key) {

        if (!key) {
            throw new Error(`Key not specified`);
        }

        const resource = this._resource ? this._resource : this._loadResource();
        return resource[key] ? resource[key] : '';
    }

    format(key, args) {
        const message = this.message(key);

        const final = message.split(' ').map(item => {
            if (item.match(/{{.}}/)) {
                const index = item.replace(/[{|}|\.]/g, '');
                const replaceWith = args[index] ? args[index] : '';
                return item.replace(item, replaceWith)
            }

            return item;
        });

        return final.join(' ');
    }

    _loadResource() {
        if (!this.dir) {
            this.dir = path.join(__dirname, 'resources', 'locale');
        }

        this.dir = path.join(this.dir, this.locale);

        const langFile = path.join(this.dir, `${this.module}.json`);

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