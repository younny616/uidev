(function(UI) {
    var calcBoundary = function() {
        var ww = $(window).width();

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
            },
        },
        zigzag: {
            pc: {
                loop: true,
                speed: 1200,
                allowTouchMove: true,
                slidesPerView: 'auto',
                pagination:false,
                on: {
                    init: function(_this, e) {
                        var _this = this;

                        $(this.el).on('mouseenter', function() {
                            _this.autoplay.stop();
                        })
                        .on('mouseleave', function() {
                            _this.autoplay.start();
                        });
                    }
                }
            },
            tablet: {
                loop: true,
                speed: 1200,
                allowTouchMove: true,
                slidesPerView: 'auto',
                navigation: false,
                pagination: false,
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                slidesPerView: 'auto',
                navigation: false,
                pagination: false,
            },
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
            tablet: {
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
    };
    var bestThemeSlider = null;
    var newThemeSlider = null;
    var mobileThemeSlider = null;
    var combineThemeSlider = null;
    var combineThumbsSlider = null;

    switch (calcBoundary(window.innerWidth)) {
        case 'mobile':
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.mobile).init();
            mobileThemeSlider = new Cafe24.SwiperSlider('#mobileTheme', sliderOptions.zigzag.mobile).init();
            combineThemeSlider = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.mobile).init();
            break;
        case 'tablet':
            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.tablet).init();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.tablet).init();
            mobileThemeSlider = new Cafe24.SwiperSlider('#mobileTheme', sliderOptions.zigzag.tablet).init();
            combineThemeSlider = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.tablet).init();
            combineThumbsSlider = new Cafe24.SwiperSlider('#combineThumbs', sliderOptions.combine.thumbs).init();
            combineThemeSlider.controller.control = combineThumbsSlider;
            combineThumbsSlider.controller.control = combineThemeSlider;
            break;
        case 'pc':
            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.pc).init();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.pc).init();
            mobileThemeSlider = new Cafe24.SwiperSlider('#mobileTheme', sliderOptions.zigzag.pc).init();
            combineThemeSlider = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.pc).init();
            combineThumbsSlider = new Cafe24.SwiperSlider('#combineThumbs', sliderOptions.combine.thumbs).init();
            combineThemeSlider.controller.control = combineThumbsSlider;
            combineThumbsSlider.controller.control = combineThemeSlider;
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

            if (combineThumbsSlider !== null) {
                combineThumbsSlider.destroy();
                combineThumbsSlider = null;
            }

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.mobile).init();

            mobileThemeSlider.destroy();
            mobileThemeSlider = new Cafe24.SwiperSlider('#mobileTheme', sliderOptions.zigzag.mobile).init();

            combineThemeSlider.destroy();
            combineThemeSlider = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.mobile).init();
            combineThemeSlider.controller.control = null;

        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            if (bestThemeSlider !== null) {
                bestThemeSlider.destroy();
                bestThemeSlider = null;
            }

            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.tablet).init();

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.tablet).init();

            mobileThemeSlider.destroy();
            mobileThemeSlider = new Cafe24.SwiperSlider('#mobileTheme', sliderOptions.zigzag.tablet).init();

            combineThemeSlider.destroy();
            combineThemeSlider = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.tablet).init();

            if (combineThumbsSlider !== null) {
                combineThumbsSlider.destroy();
                combineThumbsSlider = null;
            }

            combineThumbsSlider = new Cafe24.SwiperSlider('#combineThumbs', sliderOptions.combine.thumbs).init();
            combineThemeSlider.controller.control = combineThumbsSlider;
            combineThumbsSlider.controller.control = combineThemeSlider;

        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

            if (bestThemeSlider !== null) {
                bestThemeSlider.destroy();
                bestThemeSlider = null;
            }

            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.pc).init();

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.pc).init();

            mobileThemeSlider.destroy();
            mobileThemeSlider = new Cafe24.SwiperSlider('#mobileTheme', sliderOptions.zigzag.pc).init();

            combineThemeSlider.destroy();
            combineThemeSlider = new Cafe24.SwiperSlider('#combineTheme', sliderOptions.combine.pc).init();

            if (combineThumbsSlider !== null) {
                combineThumbsSlider.destroy();
                combineThumbsSlider = null;
            }

            combineThumbsSlider = new Cafe24.SwiperSlider('#combineThumbs', sliderOptions.combine.thumbs).init();
            combineThemeSlider.controller.control = combineThumbsSlider;
            combineThumbsSlider.controller.control = combineThemeSlider;
        }
    });

    UI.onPagination('.bestThemeArea .btnMore', '#bestTheme .sliderWrapper', 4);

})(Cafe24.UI);
