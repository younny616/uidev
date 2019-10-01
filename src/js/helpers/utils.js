class Utils {
    constructor(name) {
        this.name = name || 'Cafe utils';
        this.version = '1.0.0';
    }

    _makeRandom(values) { // insted pug function
        return values.sort((v1, v2) => Math.random() - Math.random());
    }
}

export default new Utils();