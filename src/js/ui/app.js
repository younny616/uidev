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
            },
            tablet: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
            },
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
    };
    var newAppSlider = null;
    var makeAppSlider = null;

    switch (calcBoundary(window.innerWidth)) {
        case 'mobile':
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.mobile).init();
            break;
        case 'tablet':
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.tablet).init();
            makeAppSlider = new Cafe24.SwiperSlider('#makeApp', sliderOptions.simple.tablet).init();
            break;
        case 'pc':
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.pc).init();
            makeAppSlider = new Cafe24.SwiperSlider('#makeApp', sliderOptions.simple.pc).init();
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

            if (makeAppSlider !== null) {
                makeAppSlider.destroy();
                makeAppSlider = null;
            }

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.mobile).init();
        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.tablet).init();

            if (makeAppSlider !== null) {
                makeAppSlider.destroy();
                makeAppSlider = null;
            }

            makeAppSlider = new Cafe24.SwiperSlider('#makeApp', sliderOptions.simple.tablet).init();
        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.pc).init();

            makeAppSlider.destroy();
            makeAppSlider = new Cafe24.SwiperSlider('#makeApp', sliderOptions.simple.pc).init();
        }
    });

    UI.onPagination('.appListArea .btnMore', '.appListArea .appGroup', 4);

})(Cafe24.UI);
