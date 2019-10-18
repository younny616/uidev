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
    var relativeTheme1Slider = null;
    var relativeTheme2Slider = null;

    switch (calcBoundary(window.innerWidth)) {
        case 'mobile':
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.mobile).init();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.mobile).init();
            break;
        case 'tablet':
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.tablet).init();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.tablet).init();
            break;
        case 'pc':
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

            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.mobile).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.mobile).init();
        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.tablet).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.tablet).init();

        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

            relativeTheme1Slider.destroy();
            relativeTheme1Slider = new Cafe24.SwiperSlider('#relativeTheme1', sliderOptions.theme.pc).init();
            relativeTheme2Slider.destroy();
            relativeTheme2Slider = new Cafe24.SwiperSlider('#relativeTheme2', sliderOptions.theme.pc).init();
        }
    });
})(Cafe24.UI);
