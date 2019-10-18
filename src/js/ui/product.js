(function(UI) {
    var calcOffset = function(wrap, gap) {
        return (wrap.find('.infoPrice').offset().top + parseInt(wrap.find('.infoPrice').outerHeight(), 10)) - parseInt(gap.outerHeight(), 10);
    };
    var isFixed = false;
    var isResizing = false;

    var $header = $('#header');
    var $infoWrap = $('.productThumbsAndInfoArea .infoWrap');
    var $infoFixed = $infoWrap.find('.infoFixed');
    var infoFixedOffset = calcOffset($infoWrap, $header);
    var scrollDirection = 0;

    $(window).on('resize', function() {
        isResizing = true;
        infoFixedOffset = calcOffset($infoWrap, $header);
    });

    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();

        if (!isResizing) {
            if (scrollTop > infoFixedOffset && !isFixed) {
                isFixed = true;

                $infoFixed.addClass('fixed');
            } else if (scrollTop < infoFixedOffset && isFixed) {
                isFixed = false;

                $infoFixed.removeClass('fixed');
            }

            if (scrollDirection > scrollTop && scrollTop > infoFixedOffset) {
                $header.addClass('scrollUp').removeClass('scrollDown');
                $infoFixed.addClass('scrollUp').removeClass('scrollDown');
            } else if (scrollDirection < scrollTop && scrollTop > infoFixedOffset) {
                $header.addClass('scrollDown').removeClass('scrollUp');
                $infoFixed.addClass('scrollDown').removeClass('scrollUp');
            } else {
                $header.removeClass('scrollDown').removeClass('scrollUp');
                $infoFixed.removeClass('scrollDown').removeClass('scrollUp');
            }
        } else {
            isResizing = false;
            infoFixedOffset = calcOffset($infoWrap, $header);
        }

        scrollDirection = scrollTop;
    });

})(Cafe24.UI);
