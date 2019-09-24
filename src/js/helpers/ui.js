class UI {
    constructor(name) {
        this.name = name || 'Cafe UI';
        this.version = '1.0.0';
    }

    onToggleClass(target, parent, className) {
        let callback;

        if (!parent) {
            callback = () => $(target).toggleClass(className);
        } else {
            callback = () => $(target).parents(parent).toggleClass(className);
        }

        return $(document).on('click', target, callback);
    }

    _makeRandom(values) { // insted pug function
        return values.sort((v1, v2) => Math.random() - Math.random());
    }
}

export default new UI();