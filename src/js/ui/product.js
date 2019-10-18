(function(UI) {
    var calcBoundary = function(ww) {
        if (ww < 769) {
            return 'mobile';
        } else if (ww < 1080 && ww > 770) {
            return 'tablet';
        } else {
            return 'pc';
        }
    };

    var calcOffset = function(wrap, gap) {
        return (wrap.find('.infoPrice').offset().top + parseInt(wrap.find('.infoPrice').outerHeight(), 10)) - parseInt(gap.outerHeight(), 10);
    };

    var isFixed = false;
    var isResizing = false;
    var isDestroy = {
        pc: false,
        tablet: false,
        mobile: false
    };
    var sliderOptions = {
        app: {
            pc: {
                loop: true,
                loopedSlides: 4,
                loopAdditionalSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                pagination: false,
            },
            tablet: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: false,
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: {
                    type: 'fraction',
                },
            }
        },
        theme: {
            pc: {
                loop: true,
                loopedSlides: 4,
                loopAdditionalSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                allowTouchMove: false,
                pagination: false,
            },
            tablet: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: false,
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: {
                    type: 'fraction',
                },
            },
        },
    }
    var relativeApp1Slider = null;
    var relativeApp2Slider = null;
    var relativeTheme1Slider = null;
    var relativeTheme2Slider = null;

    var $header = $('#header');
    var $infoWrap = $('.detailProductArea .infoWrap');
    var $infoFixed = $infoWrap.find('.infoFixed');
    var infoFixedOffset = calcOffset($infoWrap, $header);
    var scrollDirection = 0;

    switch (calcBoundary(window.innerWidth)) {
        case 'mobile':
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.mobile).init();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.mobile).init();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.mobile).init();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.mobile).init();
            break;
        case 'tablet':
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.tablet).init();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.tablet).init();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.tablet).init();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.tablet).init();
            break;
        case 'pc':
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.pc).init();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.pc).init();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.pc).init();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.pc).init();
            break;
    }

    $(window).on('resize', function() {
        var ww = window.innerWidth;
        var resizeBoundary = {
            pc: 1081,
            tablet: 1080,
            mobile: 769
        };

        isResizing = true;
        infoFixedOffset = calcOffset($infoWrap, $header);

        if (ww < resizeBoundary.mobile && !isDestroy.mobile) {
            isDestroy.mobile = true;
            isDestroy.tablet = false;

            relativeApp1Slider.destroy();
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.mobile).init();
            relativeApp2Slider.destroy();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.mobile).init();

            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.mobile).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.mobile).init();
        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            relativeApp1Slider.destroy();
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.tablet).init();
            relativeApp2Slider.destroy();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.tablet).init();

            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.tablet).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.tablet).init();

        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

            relativeApp1Slider.destroy();
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.pc).init();
            relativeApp2Slider.destroy();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.pc).init();

            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.pc).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.pc).init();
        }
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
