(function(UI) {
    var loadBoundary = $(window).width() > 769 ? true : false;
    var isDestroy = false;
    var sliderOptions = {
        theme: {
            pc: {
                loop: true,
                loopedSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                slidesPerView: 'auto',
                pagination: false,
            },
            mobile: {
                loop: false,
                loopedSlides: 1,
                slidesPerGroup: 1,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                slidesPerView: 'auto',
                navigation: false,
                pagination: {
                    type: 'fraction',
                },
            }
        },
        combine: {
            pc: {
                loop: true,
                speed: 1200,
                autoplay: false,
                slidesPerView: 'auto',
                slideToClickedSlide: true,
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                slidesPerView: 'auto',
                slideToClickedSlide: true,
                allowTouchMove: true,
                navigation: false,
                pagination: {
                    type: 'fraction',
                },
            },
            thumbs: {
                loop: true,
                speed: 1200,
                autoplay: false,
                slidesPerView: 'auto',
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                navigation: false,
                pagination: false,
            },
        }
    }

    // var bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', pcOptions).init();
    var newThemeSlider = new Cafe24.SwiperSlider('#newTheme', loadBoundary ?  sliderOptions.theme.pc : sliderOptions.theme.mobile).init();
    var mobileTheme = new Cafe24.SwiperSlider('#mobileTheme', loadBoundary ?  sliderOptions.theme.pc : sliderOptions.theme.mobile).init();

    var combineThumbsSlider = new Cafe24.SwiperSlider('#combineThumbs', sliderOptions.combine.thumbs).init();
    var combineTheme = new Cafe24.SwiperSlider('#combineTheme', loadBoundary ?  sliderOptions.combine.pc : sliderOptions.combine.mobile).init();

    combineTheme.controller.control = combineThumbsSlider;
    combineThumbsSlider.controller.control = combineTheme;

    /**
     * reinit slider on resize
     */

    $(window).on('resize', function() {
        var ww = $(window).width();
        var resizeBoundary = 769;

        if (ww < resizeBoundary && !isDestroy) {
            isDestroy = true;

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.mobile).init();

            combineTheme.destroy();
            combineTheme = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.mobile).init();
            combineTheme.controller.control = combineThumbsSlider;
            combineThumbsSlider.controller.control = combineTheme;
        } else if (ww > resizeBoundary && isDestroy) {
            isDestroy = false;

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.pc).init();

            combineTheme.destroy();
            combineTheme = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.pc).init();
            combineTheme.controller.control = combineThumbsSlider;
            combineThumbsSlider.controller.control = combineTheme;
        }
    });
})(Cafe24.UI);
