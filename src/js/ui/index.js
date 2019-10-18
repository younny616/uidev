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
        theme: {
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
        random: {
            mobile : {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
            }
        },
    };
    var bestThemeSlider = null;
    var newAppSlider = null;
    var newThemeSlider = null;
    var combineRandom = null;

    switch (calcBoundary(window.innerWidth)) {
        case 'mobile':
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.mobile).init();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.mobile).init();
            combineRandom = new Cafe24.SwiperSlider('#combineRandom', sliderOptions.random.mobile).init();
            break;
        case 'tablet':
            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.tablet).init();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.tablet).init();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.tablet).init();
            break;
        case 'pc':
            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.pc).init();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.pc).init();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.pc).init();
            break;
    }

    $(window).on('resize', function() {
        var ww = $(window).width();
        var resizeBoundary = {
            pc: 1081,
            tablet: 1080,
            mobile: 769
        }

        if (ww < resizeBoundary.mobile && !isDestroy.mobile) {
            isDestroy.mobile = true;
            isDestroy.tablet = false;

            if (bestThemeSlider !== null) {
                bestThemeSlider.destroy();
                bestThemeSlider = null;
            }

            if (combineRandom !== null) {
                combineRandom.destroy();
                combineRandom = null
            }

            combineRandom = new Cafe24.SwiperSlider('#combineRandom', sliderOptions.random.mobile).init();

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.mobile).init();

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.mobile).init();

        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            if (combineRandom !== null) {
                combineRandom.destroy();
                combineRandom = null
            }

            if (bestThemeSlider !== null) {
                bestThemeSlider.destroy();
                bestThemeSlider = null;
            }

            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.tablet).init();

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.tablet).init();

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.tablet).init();

        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

            if (bestThemeSlider !== null) {
                bestThemeSlider.destroy();
                bestThemeSlider = null;
            }

            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.pc).init();

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.pc).init();

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.pc).init();
        }
    });

    UI.onPagination('.appListArea .btnMore', '.appGroup', 4);
    UI.onPagination('.bestThemeArea .btnMore', '#bestTheme .sliderWrapper', 4);

})(Cafe24.UI);
