class Utils {
    constructor(name) {
        this.name = name || 'Cafe utils';
        this.version = '1.0.0';
    }

    _makeRandom(values) {
        return values.sort((v1, v2) => Math.random() - Math.random());
    }

    _number_format(e, _self, delegator) {
        let deleteComma = _self.value.toString().replace(/\,/g, '');

        if (isFinite(deleteComma) === false) return _self.value = '';

        let temp = deleteComma;
        return _self.value = temp.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    }

    _resetAll(target, inputType) {
        const container = document.querySelector(target);
        const targets = container.querySelectorAll(`input[type=${inputType}]`);

        targets.forEach(self => self.checked = false);
    }
}

export default new Utils();