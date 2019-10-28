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
    var isDestroy = {
        pc: false,
        tablet: false,
        mobile: false
    };
    var sliderOptions = {
        simple: {
            pc: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                pagination: false,
                observer: true,
                observeParents: true,
            },
            tablet: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                pagination: false,
                observer: true,
                observeParents: true,
            },
            mobile: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                pagination: false,
                navigation: false,
                observer: true,
                observeParents: true,
            },
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
    var screenShotThemeSlider = null;
    var relativeTheme1Slider = null;
    var relativeTheme2Slider = null;

    switch (calcBoundary(window.innerWidth)) {
        case 'mobile':
            screenShotThemeSlider = new Cafe24.SwiperSlider('#screenShotTheme', sliderOptions.simple.mobile).init();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.mobile).init();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.mobile).init();
            break;
        case 'tablet':
            screenShotThemeSlider = new Cafe24.SwiperSlider('#screenShotTheme', sliderOptions.simple.tablet).init();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.tablet).init();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.tablet).init();
            break;
        case 'pc':
            screenShotThemeSlider = new Cafe24.SwiperSlider('#screenShotTheme', sliderOptions.simple.pc).init();
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

        if (ww < resizeBoundary.mobile && !isDestroy.mobile) {
            isDestroy.mobile = true;
            isDestroy.tablet = false;

            screenShotThemeSlider.destroy();
            screenShotThemeSlider = new Cafe24.SwiperSlider('#screenShotTheme', sliderOptions.simple.mobile).init();
            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.mobile).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.mobile).init();
        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            screenShotThemeSlider.destroy();
            screenShotThemeSlider = new Cafe24.SwiperSlider('#screenShotTheme', sliderOptions.simple.tablet).init();
            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.tablet).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.tablet).init();

        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

            screenShotThemeSlider.destroy();
            screenShotThemeSlider = new Cafe24.SwiperSlider('#screenShotTheme', sliderOptions.simple.pc).init();
            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.pc).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.pc).init();
        }
    });
})(Cafe24.UI);
