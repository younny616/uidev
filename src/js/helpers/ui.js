import Utils from './utils';

class UI {
    constructor(name) {
        this.name = name || 'Cafe UI';
        this.version = '1.0.0';
    }

    /**
     * @param {string} self : event selctor
     * @param {string} target : target selctor
     * @param {string} className : add class name
     */

    onAddClass(self, target, className) {
        return $(document).on('click', self, () => $(target).addClass(className));
    }

    /**
     * @param {string} self : event selctor
     * @param {string} target : target class
     * @param {string} className : remove class name
     */

    onRemoveClass(self, target, className) {
        return $(document).on('click', self, () => $(target).removeClass(className));
    }

    /**
     * @param {string} self : event selctor
     * @param {string} target : arg.length === 2 : target selector
     * @param {string} className : arg.length === 1 : toggle class name
     */

    onToggleClass(self, ...arg) {
        let toggleFunc;

        if (arg.length === 1) {
            toggleFunc = (e) => $(e.currentTarget).toggleClass(arg[0]);
        } else {
            toggleFunc = (e) => $(e.currentTarget).parents(arg[0]).toggleClass(arg[1]);
        }

        return $(document).on('click', self, toggleFunc);
    }

    /**
     * @param {string} self : event selctor
     * @param {string} target : target selctor
     * @param {string} resetType : input type name
     */

    onResetAll(self, target, resetType) {
        return $(document).on('click', self, () => Utils._resetAll(target, resetType));
    }

    /**
     * @param {string} self : event selctor
     * @param {string} className : toggle class name
     */

    onSlideToggleClass(self, className) {
        return $(document).on('click', self, (e) => {
            $(e.currentTarget).toggleClass(className);
            $(e.currentTarget).siblings().slideToggle(() => $(e.currentTarget).parent().toggleClass(className));
        });
    }

    /**
     * @param {string} self : event selctor
     * @param {string} target : target selctor
     * @param {number} moreCount : count Number
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
    }
}

export default new UI();