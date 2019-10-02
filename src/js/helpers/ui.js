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
            callback = () => $(target).parent().toggleClass(className);
        }

        return $(document).on('click', target, callback);
    }

    onPagination(target, startCount, moreCount) {

    }

}

export default new UI();