(function(UI) {
    var loadBoundary = $(window).width() > 769 ? true : false;
    var isDestroyTablet = false;
    var isDestroyMobile = false;
    var sliderOptions = {
        theme: {
            pc: {
                loop: true,
                loopedSlides: 4,
                loopAdditionalSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                slidesPerView: 'auto',
                pagination: false,
            },
            mobile: {
                loop: false,
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
        zigzag: {
            pc: {
                loop: true,
                loopedSlides: 4,
                loopAdditionalSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                slidesPerView: 'auto',
                navigation: false,
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                slidesPerView: 'auto',
                navigation: false,
            }
        },
        combine: {
            pc: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                loopedSlides: 10,
                slidesPerView: 'auto',
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
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
                allowTouchMove: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true,
                loopedSlides: 10,
                navigation: false,
                pagination: false,
            },
        }
    }

    var bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', loadBoundary ?  sliderOptions.theme.pc : sliderOptions.theme.mobile).init();
    var newThemeSlider = new Cafe24.SwiperSlider('#newTheme', loadBoundary ?  sliderOptions.theme.pc : sliderOptions.theme.mobile).init();
    var mobileTheme = new Cafe24.SwiperSlider('#mobileTheme', loadBoundary ?  sliderOptions.zigzag.pc : sliderOptions.zigzag.mobile).init();

    var combineThumbsSlider = new Cafe24.SwiperSlider('#combineThumbs', sliderOptions.combine.thumbs).init();
    var combineTheme = new Cafe24.SwiperSlider('#combineTheme', loadBoundary ?  sliderOptions.combine.pc : sliderOptions.combine.mobile).init();

    combineTheme.controller.control = combineThumbsSlider;
    combineThumbsSlider.controller.control = combineTheme;

    /**
     * reinit slider on resize
     */

    $(window).on('resize', function() {
        var ww = $(window).width();
        var resizeBoundaryTablet = 1080;

        if (ww < resizeBoundaryTablet && !isDestroyTablet) {
            isDestroyTablet = true;

            bestThemeSlider.destroy();
            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.mobile).init();
            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.mobile).init();
            mobileTheme.destroy();
            mobileTheme = new Cafe24.SwiperSlider('#mobileTheme', sliderOptions.zigzag.mobile).init();

            combineTheme.destroy();
            combineTheme = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.mobile).init();
            combineTheme.controller.control = combineThumbsSlider;
            combineThumbsSlider.controller.control = combineTheme;
        } else if (ww > resizeBoundaryTablet && isDestroyTablet) {
            isDestroyTablet = false;

            bestThemeSlider.destroy();
            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.pc).init();
            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.pc).init();
            mobileTheme.destroy();
            mobileTheme = new Cafe24.SwiperSlider('#mobileTheme', sliderOptions.zigzag.pc).init();

            combineTheme.destroy();
            combineTheme = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.pc).init();
            combineTheme.controller.control = combineThumbsSlider;
            combineThumbsSlider.controller.control = combineTheme;
        }
    });

})(Cafe24.UI);
