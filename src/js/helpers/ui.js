import Utils from './utils';

class UI {
    constructor(name) {
        this.name = name || 'Cafe UI';
        this.version = '1.0.0';
    }

    /**
     * @param {string} self : event selector
     * @param {string} target : target selector
     * @param {string} className : add class name
     */

    onAddClass(self, target, className) {
        return $(document).on('click', self, () => $(target).addClass(className));
    }

    /**
     * @param {string} self : event selector
     * @param {string} target : target class
     * @param {string} className : remove class name
     */

    onRemoveClass(self, target, className) {
        return $(document).on('click', self, () => $(target).removeClass(className));
    }

    /**
     * @param {string} self : event selector
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
     * @param {string} self : event selector
     * @param {string} target : target selector
     * @param {string} resetType : input type name
     */

    onResetAll(self, target, resetType) {
        return $(document).on('click', self, () => Utils._resetAll(target, resetType));
    }

    /**
     * @param {string} self : event selector
     * @param {string} className : toggle class name
     */

    onSlideToggleClass(self, className) {
        return $(document).on('click', self, (e) => {
            const $target = $(e.currentTarget);

            $target.toggleClass(className);
            $target.siblings().slideToggle(() => $target.parent().toggleClass(className));
        });
    }

    /**
     * @param {string} self : event selector
     * @param {string} trigger : event selector
     * @param {string} className : toggle class name
     */

    onSlideAccordion(self, trigger, className) {
        let waitForTransition = false;
        return $(document).on('click', `${self} ${trigger}`, (e) => {
            const $target = $(e.currentTarget).parent();

            if (!waitForTransition) {
                $target.siblings().slideToggle(() => {
                    $target.parent().toggleClass(className);
                });

                $target.parent().siblings().each((i, self) => {
                    const $self = $(self);

                    if ($self.hasClass(className)) {
                        const $trigger = $self.find(trigger).parent();

                        waitForTransition = !waitForTransition;

                        $trigger.siblings().slideToggle(() => {
                            waitForTransition = !waitForTransition;
                            $trigger.parent().toggleClass(className);
                        });
                    }
                });
            }
        });
    }

    /**
     * @param {string} self : event selector
     * @param {string} target : target selector
     * @param {number} moreCount : count Number
     */

    onPagination(self, target, moreCount) {
        const checkDisplay = (target, callBack) => {
            const isDisplayed = Array.prototype.map.call(target, (self, i) => getComputedStyle(self).getPropertyValue('display') === 'block' ? true : false);
            return callBack(isDisplayed);
        };

        checkDisplay($(target).children(), isDisplayed => isDisplayed.every((display) => display === true)) ? $(self).hide() : false;

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

    /**
     * @param {string} self : event selector
     * @param {number} distance : distance offset
     */

    onScrollDown(self, distance = 0) {
        return $(self).on('click', (e) => {
            e.preventDefault();
            const target = $(e.currentTarget).attr('href');

            $('html, body').stop().animate({ scrollTop: $(target).offset().top - distance }, 600);
        });
    }
}

export default new UI();