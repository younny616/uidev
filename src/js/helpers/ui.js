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

    onAddClass(self, target, className,) {
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
            const $self = $(e.currentTarget);
            const $target = $self.parent();

            if (!waitForTransition) {
                $self.toggleClass(className);
                $target.siblings().slideToggle(() => {
                    $target.parent().toggleClass(className);
                });

                $target.parent().siblings().each((i, sibling) => {
                    const $sibling = $(sibling);

                    if ($sibling.hasClass(className)) {
                        const $tirgger = $sibling.find(trigger);
                        const $target = $tirgger.parent();

                        waitForTransition = !waitForTransition;

                        $tirgger.toggleClass(className);
                        $target.siblings().slideToggle(() => {
                            waitForTransition = !waitForTransition;

                            $target.parent().toggleClass(className);
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

        return $(document).on('click', self, (e) => {
            let children = $(target).children();
            let start = checkDisplay(children, isDisplayed => isDisplayed.indexOf(false));
            let end = start + moreCount;

            console.log(start, end);

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

    /**
     * @param {string} self : event selector
     * @param {string} className : toggle class name
     */
    onShowLayer(self, className) {
        return $(document).on('click', self, (e) => {
            let $target;
            const tagName = e.currentTarget.tagName;

            switch(tagName) {
                case 'A' :
                    $target = $(e.currentTarget.attributes.href.value);
                    break;
                case 'BUTTON':
                    $target = $(e.currentTarget.dataset.layer);
                    break;
            }

            $target.addClass(className);
            $('.dimmed').addClass(className);
        });
    }

    /**
     * @param {string} self : event selector
     * @param {string} trigger : target selector
     * @param {string} className : toggle class name
     */
    onHideLayer(self, target, className) {
        return $(document).on('click', self, (e) => {
            const $target = $(e.currentTarget).parents(target);

            $target.removeClass(className);
            $('.dimmed').removeClass(className);
        });
    }

    /**
     * @param {string} self : event selector
     * @param {string} types : event Types
     * @param {string} className : toggle class name
     * @param {negative number} distance: offset left distance
     */
    onShowTooltip(self, types, className, distance = 0) {
        if (!(distance <= 0)) throw new Error('{distance} must be negative numbers');

        switch (types) {
            case 'toggle':
                return $(document).on('click', self, (e) => {
                    const $self = $(e.currentTarget);
                    const $parent = $self.parent();
                    const $tooltip = $parent.find('.tooltip');
                    const $tooltipArrow = $tooltip.find('.arrow');
                    const $close = $parent.find('.btnClose');
                    let contentSize = $self.offset().left + parseInt($tooltip.innerWidth(), 10);
                    let posLeft = Math.abs(distance);

                    $parent.toggleClass(className);

                    if (window.innerWidth < contentSize) {
                        $tooltip.css('left', posLeft - $self.offset().left + 'px');
                        $tooltipArrow.css('left', ($self.offset().left - posLeft) + (($self.outerWidth(true) / 2) - ($tooltipArrow.width() / 2)) + 'px');
                    } else {
                        $tooltip.css('left', '-' + posLeft + 'px');
                        $tooltipArrow.css('left', posLeft + (($self.outerWidth(true) / 2) - ($tooltipArrow.width() / 2)) + 'px');
                    }

                    $close.on('click', () => $parent.removeClass(className));
                });
                break;
            case 'hover':
                return $(self).hover((e) => {
                    const $self = $(e.currentTarget);
                    const $target = $self.parent().find('.mTooltip.typeHover');
                    const $tooltip = $target.find('.tooltip');
                    const $tooltipArrow = $tooltip.find('.arrow');
                    let contentSize = $self.offset().left;
                    let posLeft = Math.abs(distance);

                    $target.toggleClass(className);

                    if (window.innerWidth < contentSize) {
                        $tooltip.css('left', $self.offset().left - posLeft + 'px');
                        $tooltipArrow.css('left', ($self.offset().left - posLeft + ($tooltipArrow.width() / 2)) + 'px');
                    } else {
                        $tooltip.css('left', '-' + posLeft + 'px');
                        $tooltipArrow.css('left', 20 + ($tooltipArrow.width() / 2) + 'px');
                    }
                }, (e) => {
                    const $self = $(e.currentTarget);
                    const $target = $self.parent().find('.mTooltip.typeHover');

                    $target.toggleClass(className);
                });
                break;
            default :
                return false;
        }
    }
}

export default new UI();