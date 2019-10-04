class UI {
    constructor(name) {
        this.name = name || 'Cafe UI';
        this.version = '1.0.0';
    }

    /**
     * @param {string} self : button class
     * @param {boolean} parent : target parent class
     * @param {string} className : toggle class
     */
    onToggleClass(self, parent, className) {
        let toggleFunc;

        if (!parent) {
            toggleFunc = () => $(self).toggleClass(className);
        } else {
            toggleFunc = () => $(self).parent().toggleClass(className);
        }

        return $(document).on('click', self, toggleFunc);
    }

    /**
     * @param {string} self : button class
     * @param {string} target : button class
     * @param {number} moreCount : target parent class
     */
    onPagination(self, target, moreCount) {
        const checkDisplay = (target, callBack) => {
            const isDisplayed = Array.prototype.map.call(target, (self, i) => getComputedStyle(self).getPropertyValue('display') === 'block' ? true : false);
            return callBack(isDisplayed);
        };

        return $(document).on('click', self, () => {
            let children = $(target).children();
            let start = checkDisplay(children, isDisplayed => isDisplayed.indexOf(false));
            let end = start + moreCount;

            while (start < end) {
                $(children[start]).addClass('displayed');
                start++;
            }

            return checkDisplay(children, isDisplayed => isDisplayed.every((display) => display === true)) ? $(self).hide() : false;
        });

        // return $(document).on('click', target, callback);
    }

}

export default new UI();