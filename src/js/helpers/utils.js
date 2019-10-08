class Utils {
    constructor(name) {
        this.name = name || 'Cafe utils';
        this.version = '1.0.0';
    }

    _makeRandom(values) {
        return values.sort((v1, v2) => Math.random() - Math.random());
    }

    _number_format(e, _self, delegator) {
        var deleteComma = _self.value.toString().replace(/\,/g, '');

        if (isFinite(deleteComma) === false) {
            alert('문자는 입력하실 수 없습니다.');
            return _self.value = '';
        }

        let temp = deleteComma;
        return _self.value = temp.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    }
}

export default new Utils();