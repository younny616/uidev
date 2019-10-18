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
    }
    var relativeApp1Slider = null;
    var relativeApp2Slider = null;

    switch (calcBoundary(window.innerWidth)) {
        case 'mobile':
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.mobile).init();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.mobile).init();
            break;
        case 'tablet':
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.tablet).init();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.tablet).init();
            break;
        case 'pc':
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.pc).init();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.pc).init();
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
        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            relativeApp1Slider.destroy();
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.tablet).init();
            relativeApp2Slider.destroy();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.tablet).init();
        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

            relativeApp1Slider.destroy();
            relativeApp1Slider = new Cafe24.SwiperSlider('#relativeApp1', sliderOptions.app.pc).init();
            relativeApp2Slider.destroy();
            relativeApp2Slider = new Cafe24.SwiperSlider('#relativeApp2', sliderOptions.app.pc).init();
        }
    });

})(Cafe24.UI);
