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

    onHide(target, callBack) {
        return $(document).on('click', target, () => {
            $(target).parent().hide();
        });

        if (typeof callBack === 'function') {
            callBack.call(this);
        }

        return this;
    }

    onShow(target) {
        $(document).on('click', target, () => {
            setTimeout(() => {
                $(target).parent().show();
            }, 900)
        });

        return this;
    }
}

export default new UI();